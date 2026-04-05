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
import { Loader2, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

const MEDIA_API = "http://localhost:6001/api/v1/media";

function LectureTab() {
  const [lectureTitle, setLectureTitle] = useState("");
  const [uploadVideoInfo, setUploadVideoInfo] = useState(null);
  const [isFree, setIsFree] = useState(false);
  const [mediaProgress, setMediaProgress] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const navigate = useNavigate();
  const { courseId, lectureId } = useParams();

  const [editLecture, { data, isLoading, error, isSuccess }] =
    useEditLectureMutation();
  const [
    removeLecture,
    { data: removeData, isLoading: removeLoading, isSuccess: removeSuccess },
  ] = useRemoveLectureMutation();
  const { data: lectureData } = useGetLectureByIdQuery(lectureId);
  const lecture = lectureData?.lecture;

  useEffect(() => {
    if (lecture) {
      setLectureTitle(lecture?.lectureTitle);
      setIsFree(lecture?.isPreviewFree);
      setUploadVideoInfo(lecture?.videoInfo);
    }
  }, [lecture]);

  useEffect(() => {
    if (isSuccess) {
      toast.success(data?.message || "Lecture updated successfully");
      navigate(-1);
    }
    if (error) {
      toast.error(error?.data?.message || "Failed to update lecture");
    }
  }, [isSuccess, error, data, navigate]);

  useEffect(() => {
    if (removeSuccess) {
      toast.success(removeData?.message || "Lecture removed successfully");
      navigate(-1);
    }
  }, [removeSuccess, removeData, navigate]);

  const fileChangeHandler = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    setMediaProgress(true);

    try {
      const res = await axios.post(`${MEDIA_API}/upload-video`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (e) => {
          setUploadProgress(Math.round((e.loaded * 100) / e.total));
        },
      });

      if (res.data?.success) {
        setUploadVideoInfo({
          videoUrl: res.data.data.url,
          publicId: res.data.data.public_id,
        });
        toast.success(res.data.message);
      }
    } catch (err) {
      console.error("Video upload error:", err);
      toast.error("Video upload failed. Please try again.");
    } finally {
      setMediaProgress(false);
      setUploadProgress(0);
    }
  };

  const editLectureHandler = async () => {
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

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="shadow-md">
        <CardHeader className="flex justify-between items-start md:items-center">
          <div>
            <CardTitle>Edit Lecture</CardTitle>
            <CardDescription>
              Update lecture info, video, and free/paid status.
            </CardDescription>
          </div>
          <div className="flex gap-2">
            <Button
              variant="destructive"
              disabled={removeLoading}
              onClick={removeLectureHandler}
              className="flex items-center gap-2"
            >
              {removeLoading && <Loader2 className="animate-spin h-4 w-4" />}
              <Trash2 size={16} />
              Remove
            </Button>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Lecture Title */}
          <div>
            <Label>Title</Label>
            <Input
              value={lectureTitle}
              onChange={(e) => setLectureTitle(e.target.value)}
              placeholder="Ex. Introduction to JavaScript"
            />
          </div>

          {/* Video Upload */}
          <div>
            <Label>
              Video <span className="text-red-500">*</span>
            </Label>
            <Input type="file" accept="video/*" onChange={fileChangeHandler} />
            {uploadVideoInfo?.videoUrl && (
              <video
                src={uploadVideoInfo.videoUrl}
                controls
                className="mt-3 w-full rounded-lg border"
              />
            )}
            {mediaProgress && (
              <div className="mt-2">
                <Progress value={uploadProgress} />
                <p className="text-sm mt-1">{uploadProgress}% uploaded</p>
              </div>
            )}
          </div>

          {/* Free Preview */}
          <div className="flex items-center gap-2">
            <Switch checked={isFree} onCheckedChange={setIsFree} />
            <Label>Is this lecture FREE?</Label>
          </div>

          {/* Save Changes */}
          <div className="flex justify-end gap-2 mt-4">
            <Button
              variant="outline"
              onClick={() => navigate(-1)}
              disabled={isLoading || mediaProgress}
            >
              Cancel
            </Button>
            <Button
              onClick={editLectureHandler}
              disabled={isLoading || mediaProgress || !uploadVideoInfo}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
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
