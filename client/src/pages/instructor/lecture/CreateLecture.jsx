import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useEffect } from "react";
import Lecture from "./Lecture";
import { useNavigate, useParams } from "react-router-dom";
import { Loader2 } from "lucide-react";
import {
  useCreateLectureMutation,
  useGetCourseLectureQuery,
} from "@/features/api/courseApi";
import { toast } from "sonner";

function CreateLecture() {
  const navigate = useNavigate();
  const [lectureTitle, setLectureTitle] = React.useState("");
  const params = useParams();
  console.log(params);
  const courseId = params?.courseId;

  const [createLecture, { data, isLoading, error, isSuccess }] =
    useCreateLectureMutation();

  const {
    data: lectureData,
    isLoading: lectureLoading,
    error: lectureError,
    refetch,
  } = useGetCourseLectureQuery(courseId);

  console.log("lectureData:", lectureData);

  const createLectureHandler = async () => {
    await createLecture({ lectureTitle, courseId });
  };

  useEffect(() => {
    if (isSuccess) {
      refetch();
      setLectureTitle("");
      toast.success(data?.message || "Lecture created successfully");
    }
    if (error) {
      toast.error(error?.data?.message || "Failed to create lecture");
    }
  }, [isSuccess, error, data, refetch]);

  //   const isLoading = false;
  //   const lectureLoading = false;
  //   const lectureError = false;
  //   const lectureData = { lectures: [1, 2, 3] };

  return (
    <div>
      <div className="flex-1 mx-10">
        <div className="mb-4">
          <h1 className="font-bold text-xl">
            Let's add lectures, add some basic details for your new lecture
          </h1>
          <p className="text-sm">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Possimus,
            laborum!
          </p>
        </div>
        <div className="space-y-4">
          <div>
            <Label>Title</Label>
            <Input
              type="text"
              value={lectureTitle}
              onChange={(e) => setLectureTitle(e.target.value)}
              placeholder="Your Title Name"
            />
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              onClick={() => navigate(`/teacher/courses/${courseId}`)}
            >
              Back to course
            </Button>
            <Button disabled={isLoading} onClick={createLectureHandler}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </>
              ) : (
                "Create lecture"
              )}
            </Button>
          </div>
          <div className="mt-10">
            {lectureLoading ? (
              <p>Loading lectures...</p>
            ) : lectureError ? (
              <p>Failed to load lectures.</p>
            ) : lectureData.lecture.length === 0 ? (
              <p>No lectures available</p>
            ) : (
              lectureData?.lecture?.map((lecture, index) => (
                <Lecture
                  key={lecture._id}
                  lecture={lecture}
                  courseId={courseId}
                  index={index}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateLecture;
