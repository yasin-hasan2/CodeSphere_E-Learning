import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import {
  useEditLectureMutation,
  useGetLectureByIdQuery,
  useRemoveLectureMutation,
} from "@/features/api/courseApi";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

const MEDIA_API = "http://localhost:6001/api/v1/media";

function LectureTab() {
  // const [title, setTitle] = useState("");
  const [lectureTitle, setLectureTitle] = useState("");
  const [uploadVideoInfo, setUploadVideoInfo] = useState(null);
  const [isFree, setIsFree] = useState(false);
  const [mediaProgress, setMediaProgress] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [btnDisabled, setBtnDisabled] = useState(true);
  const navigation = useNavigate();

  const params = useParams();
  const { courseId, lectureId } = params;

  const [editLecture, { data, isLoading, error, isSuccess }] =
    useEditLectureMutation();
  const [
    removeLecture,
    { data: removeData, isLoading: removeLoading, isSuccess: removeSuccess },
  ] = useRemoveLectureMutation();
  const { data: lectureData } = useGetLectureByIdQuery(lectureId);
  const lecture = lectureData?.lecture;
  console.log("lectureData:", lecture);

  const fileChangeHandler = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      setMediaProgress(true);

      try {
        const res = await axios.post(`${MEDIA_API}/upload-video`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },

          // This function is called periodically during the upload,
          // onUploadProgress:({loaded, total}) => {
          //   const progress = Math.round((loaded * 100) / total);
          //   setMediaProgress(progress);
          // }
          onUploadProgress: (progressEvent) => {
            const progress = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setUploadProgress(progress);
          },
        });
        if (res.data?.success) {
          setUploadVideoInfo({
            videoUrl: res.data.data.url,
            publicId: res.data.data.public_id,
          });
          setBtnDisabled(false);
          toast.success(res.data.message);
        }
      } catch (error) {
        console.log("Video upload error:", error);
        toast.error("Video upload failed. Please try again.");
      } finally {
        setMediaProgress(false);
        setUploadProgress(0);
      }
    }
  };

  const editLectureHandler = async () => {
    // alert("Edit Lecture Clicked");
    await editLecture({
      lectureTitle,
      courseId,
      lectureId,
      videoInfo: uploadVideoInfo,
      isPreviewFree: isFree,
    });
  };

  const removeLectureHandler = async () => {
    await removeLecture(lectureId);
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(data?.message || "Lecture updated successfully");
      navigation(-1);
    }
    if (error) {
      toast.error(error?.data?.message || "Failed to update lecture");
    }
  }, [isSuccess, error, data, navigation]);

  useEffect(() => {
    if (removeSuccess) {
      toast.success(removeData?.message || "Lecture removed successfully");
      navigation(-1);
    }
  }, [removeSuccess, removeData, navigation]);

  useEffect(() => {
    if (lecture) {
      setLectureTitle(lecture?.lectureTitle);
      setIsFree(lecture?.isPreviewFree);
      setUploadVideoInfo(lecture?.videoInfo);
    }
  }, [lecture]);

  // const removeLoading = false;
  // const mediaProgress = false;
  // const uploadProgress = 0;
  // const isLoading = false;

  return (
    <div>
      <Card>
        <CardHeader className="flex justify-between">
          <div>
            <CardTitle>Edit Lecture</CardTitle>
            <CardDescription>
              Make changes and click save when done.
            </CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Button
              disabled={removeLoading}
              variant="destructive"
              onClick={removeLectureHandler}
            >
              {removeLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </>
              ) : (
                "Remove Lecture"
              )}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div>
            <Label>Title</Label>
            <Input
              value={lectureTitle}
              onChange={(e) => setLectureTitle(e.target.value)}
              type="text"
              placeholder="Ex. Introduction to Javascript"
            />
          </div>
          <div className="my-5">
            <Label>
              Video <span className="text-red-500">*</span>
            </Label>
            <Input
              type="file"
              accept="video/*"
              onChange={fileChangeHandler}
              placeholder="Ex. Introduction to Javascript"
              className="w-fit"
            />
          </div>
          <div className="flex items-center space-x-2 my-5">
            <Switch
              checked={isFree}
              onCheckedChange={setIsFree}
              id="airplane-mode"
            />
            <Label htmlFor="airplane-mode">Is this video FREE</Label>
          </div>
          {/* 9:48 */}
          {mediaProgress && (
            <div className="my-4">
              <Progress value={uploadProgress} />
              <p>{uploadProgress}% uploaded</p>
            </div>
          )}

          <div className="mt-4">
            <Button disabled={isLoading} onClick={editLectureHandler}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </>
              ) : (
                "Update Lecture"
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default LectureTab;
