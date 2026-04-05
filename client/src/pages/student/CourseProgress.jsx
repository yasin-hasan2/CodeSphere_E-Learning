import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  useGetCourseProgressQuery,
  useMarkCourseAsCompletedMutation,
  useMarkCourseAsInCompleteMutation,
  useUpdateLectureProgressMutation,
} from "@/features/api/CourseProgressApi";
import {
  CheckCircle,
  CheckCircle2,
  CirclePlay,
  PlayCircle,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import ErrorPage from "@/pages/ErrorPage";

function CourseProgress() {
  const { courseId } = useParams();

  const { data, isLoading, isError, refetch } =
    useGetCourseProgressQuery(courseId);

  const [updateLectureProgress] = useUpdateLectureProgressMutation();

  const [markCourseAsCompleted, { isSuccess, isError: completeError }] =
    useMarkCourseAsCompletedMutation();

  const [markCourseAsInComplete, { data: inCompleteData }] =
    useMarkCourseAsInCompleteMutation();

  const [currentLecture, setCurrentLecture] = useState(null);

  useEffect(() => {
    if (isSuccess) {
      refetch();
      toast.success("Course marked as completed 🎉");
    }
    if (completeError) {
      toast.error("Something went wrong");
    }
    if (inCompleteData) {
      refetch();
      toast.success("Marked as incomplete");
    }
  }, [isSuccess, completeError, inCompleteData]);

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <ErrorPage />;

  const { course, courseProgress, completed } = data.data;

  const activeLecture =
    currentLecture || (course.lectures && course.lectures[0]);

  const isLectureCompleted = (id) =>
    courseProgress.some((p) => p.lectureId === id && p.viewed);

  const handleSelectLecture = async (lecture) => {
    setCurrentLecture(lecture);
    await updateLectureProgress({
      courseId,
      lectureId: lecture._id,
      viewed: true,
    });
    refetch();
  };

  const completedCount = courseProgress.filter((p) => p.viewed).length;
  const progressPercent = Math.round(
    (completedCount / course.lectures.length) * 100,
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 mt-10">
      {/* 🔥 HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold">{course.courseTitle}</h1>

          {/* Progress bar */}
          <div className="mt-2 w-full md:w-80 bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <p className="text-sm text-gray-500 mt-1">
            {completedCount}/{course.lectures.length} lectures completed
          </p>
        </div>

        <Button
          onClick={
            completed
              ? () => markCourseAsInComplete(courseId)
              : () => markCourseAsCompleted(courseId)
          }
          className={`flex items-center gap-2 ${
            completed ? "bg-green-500 hover:bg-green-600" : ""
          }`}
        >
          {completed ? (
            <>
              <CheckCircle size={16} /> Completed
            </>
          ) : (
            "Mark Complete"
          )}
        </Button>
      </div>

      {/* 🔥 MAIN LAYOUT */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 🎥 VIDEO SECTION */}
        <div className="lg:col-span-2 bg-black rounded-2xl overflow-hidden shadow-xl">
          <video
            src={activeLecture?.videoUrl}
            controls
            className="w-full h-[250px] md:h-[450px] object-cover"
            onPlay={() =>
              updateLectureProgress({
                courseId,
                lectureId: activeLecture._id,
                viewed: true,
              })
            }
          />

          <div className="p-5 bg-white dark:bg-gray-900">
            <h2 className="text-lg font-semibold">
              Lecture{" "}
              {course.lectures.findIndex((l) => l._id === activeLecture._id) +
                1}
              : {activeLecture.lectureTitle}
            </h2>
          </div>
        </div>

        {/* 📚 SIDEBAR */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-4 h-[500px] overflow-y-auto">
          <h2 className="font-semibold text-lg mb-4">Course Content</h2>

          <div className="space-y-3">
            {course.lectures.map((lecture, index) => {
              const active = lecture._id === activeLecture._id;

              return (
                <div
                  key={lecture._id}
                  onClick={() => handleSelectLecture(lecture)}
                  className={`p-4 rounded-xl cursor-pointer transition-all duration-300 border
                  ${
                    active
                      ? "bg-blue-50 border-blue-500 shadow-md"
                      : "hover:bg-gray-100 dark:hover:bg-gray-800"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {/* Icon */}
                      {isLectureCompleted(lecture._id) ? (
                        <CheckCircle2 className="text-green-500" />
                      ) : (
                        <PlayCircle className="text-gray-400" />
                      )}

                      <div>
                        <p className="text-sm font-medium line-clamp-1">
                          {index + 1}. {lecture.lectureTitle}
                        </p>
                      </div>
                    </div>

                    {/* Badge */}
                    {isLectureCompleted(lecture._id) && (
                      <Badge className="bg-green-100 text-green-600 text-xs">
                        Done
                      </Badge>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CourseProgress;
