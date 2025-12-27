import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import {
  useGetCourseProgressQuery,
  useMarkCourseAsCompletedMutation,
  useMarkCourseAsInCompleteMutation,
  useUpdateLectureProgressMutation,
} from "@/features/api/CourseProgressApi";
import { CheckCircle, CheckCircle2, CirclePlay } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

function CourseProgress() {
  const params = useParams();
  const courseId = params.courseId;
  const { data, isLoading, isError, refetch } =
    useGetCourseProgressQuery(courseId); // Replace "courseId" with actual course ID
  const [updateLectureProgress] = useUpdateLectureProgressMutation();
  const [
    markCourseAsCompleted,
    {
      data: completedData,
      isSuccess: completedSuccess,
      isError: completedError,
    },
  ] = useMarkCourseAsCompletedMutation();
  const [markCourseAsInComplete, { data: inCompleteData }] =
    useMarkCourseAsInCompleteMutation();
  const [currentLecture, setCurrentLecture] = useState(null);

  useEffect(() => {
    if (completedSuccess) {
      refetch(); // Refetch the course progress to get updated data
      toast.success(completedData?.message || "Course marked as completed.");
    } else if (completedError) {
      toast.error("Failed to mark course as completed.");
    }
    if (inCompleteData) {
      refetch(); // Refetch the course progress to get updated data
      toast.success(inCompleteData?.message || "Course marked as incomplete.");
    }
  }, [
    completedSuccess,
    completedError,
    completedData,
    inCompleteData,
    refetch,
  ]);

  if (isLoading) {
    return <div>Loading course progress...</div>;
  }
  if (isError) {
    return <div>Error loading course progress.</div>;
  }
  console.log("Course Progress Data:", data);
  const { course, courseProgress, completed } = data.data;
  const { courseTitle } = course;
  // console.log("viewed lectures:", courseProgress);

  // initialize the first lecture as current lecture
  const initialLecture =
    currentLecture || (course.lectures && course.lectures[0]);

  const isLectureCompleted = (lectureId) => {
    return courseProgress.some(
      (prog) => prog.lectureId === lectureId && prog.viewed
    );
  };

  const handleLectureProgress = async (lectureId) => {
    try {
      await updateLectureProgress({
        courseId,
        lectureId,
        viewed: true,
      }).unwrap();
      refetch(); // Refetch the course progress to get updated data
    } catch (error) {
      console.error("Failed to update lecture progress:", error);
    }
  };

  // Handle select a spacific lecture to watch
  const handleSelectLecture = (lecture) => {
    setCurrentLecture(lecture);
    handleLectureProgress(lecture._id);
  };

  // course lecture progress handler
  const handleCompleteCourse = async () => {
    try {
      await markCourseAsCompleted(courseId);
    } catch (error) {
      console.error("Failed to mark course as completed:", error);
    }
  };
  const handleInCompleteCourse = async () => {
    try {
      await markCourseAsInComplete(courseId);
    } catch (error) {
      console.error("Failed to mark course as completed:", error);
    }
  };

  return (
    <div>
      <div className="max-w-7xl mx-auto p-4">
        {/* Display course name  */}
        <div className="flex justify-between mb-4">
          <h1 className="text-2xl font-bold">{courseTitle}</h1>
          <Button
            onClick={completed ? handleInCompleteCourse : handleCompleteCourse}
            variant={completed ? "outline" : "default"}
          >
            {completed ? (
              <div className="flex items-center">
                <CheckCircle className="h-4 w-4 mr-2" /> <span>Completed</span>{" "}
              </div>
            ) : (
              "Mark as completed"
            )}
          </Button>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Video section  */}
          <div className="flex-1 md:w-3/5 h-fit rounded-lg shadow-lg p-4">
            <div>
              <video
                src={currentLecture?.videoUrl || initialLecture.videoUrl}
                controls
                className="w-full h-auto md:rounded-lg"
                onPlay={() =>
                  handleLectureProgress(
                    currentLecture?._id || initialLecture._id
                  )
                }
              />
            </div>
            {/* Display current watching lecture title */}
            <div className="mt-2 ">
              <h3 className="font-medium text-lg">
                {`Lecture ${
                  course.lectures.findIndex(
                    (lec) =>
                      lec._id === (currentLecture?._id || initialLecture._id)
                  ) + 1
                } : ${
                  currentLecture?.lectureTitle || initialLecture.lectureTitle
                }`}
              </h3>
            </div>
          </div>
          {/* Lecture Sidebar  */}
          <div className="flex flex-col w-full md:w-2/5 border-t md:border-t-0 md:border-l border-gray-200 md:pl-4 pt-4 md:pt-0">
            <h2 className="font-semibold text-xl mb-4">Course Lecture</h2>
            <div className="flex-1 overflow-y-auto">
              {course?.lectures.map((lecture) => (
                <Card
                  key={lecture._id}
                  className={`mb-3 hover:cursor-pointer transition transform ${
                    lecture._id === currentLecture?._id
                      ? "bg-gray-200 dark:dark:bg-gray-800"
                      : ""
                  } `}
                  onClick={() => handleSelectLecture(lecture)}
                >
                  <CardContent className="flex items-center justify-between p-4">
                    <div className="flex items-center">
                      {isLectureCompleted(lecture._id) ? (
                        <CheckCircle2
                          size={24}
                          className="text-green-500 mr-2"
                        />
                      ) : (
                        <CirclePlay size={24} className="text-gray-500 mr-2" />
                      )}
                      <div>
                        <CardTitle className="text-lg font-medium">
                          {lecture.lectureTitle}
                        </CardTitle>
                      </div>
                    </div>
                    {isLectureCompleted(lecture._id) && (
                      <Badge
                        variant={"outline"}
                        className="bg-green-200 text-green-600"
                      >
                        Completed
                      </Badge>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CourseProgress;
