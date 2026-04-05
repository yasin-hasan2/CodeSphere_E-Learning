import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Lecture from "./Lecture";
import { useNavigate, useParams } from "react-router-dom";
import { Loader2, Plus } from "lucide-react";
import {
  useCreateLectureMutation,
  useGetCourseLectureQuery,
} from "@/features/api/courseApi";
import { useEffect, useState } from "react";
import { toast } from "sonner";

function CreateLecture() {
  const navigate = useNavigate();
  const { courseId } = useParams();

  const [lectureTitle, setLectureTitle] = useState("");

  const [createLecture, { data, isLoading, error, isSuccess }] =
    useCreateLectureMutation();

  const {
    data: lectureData,
    isLoading: lectureLoading,
    error: lectureError,
    refetch,
  } = useGetCourseLectureQuery(courseId);

  const lectures = lectureData?.lecture || [];

  const createLectureHandler = async () => {
    if (!lectureTitle) return toast.error("Lecture title is required");
    await createLecture({ lectureTitle, courseId });
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(data?.message || "Lecture created");
      setLectureTitle("");
      refetch();
    }
    if (error) {
      toast.error(error?.data?.message || "Failed to create lecture");
    }
  }, [isSuccess, error, data, refetch]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* 🔥 LEFT: CREATE PANEL */}
      <div className="lg:col-span-1 space-y-6">
        <div className="bg-white dark:bg-gray-900 border rounded-2xl p-6 space-y-5">
          <div>
            <h2 className="text-xl font-bold">Add Lecture</h2>
            <p className="text-sm text-gray-500">
              Create and organize your course lectures
            </p>
          </div>

          <div className="space-y-2">
            <Label>Lecture Title</Label>
            <Input
              value={lectureTitle}
              onChange={(e) => setLectureTitle(e.target.value)}
              placeholder="e.g. Introduction to React"
              className="h-11"
            />
          </div>

          <Button
            onClick={createLectureHandler}
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <Loader2 className="animate-spin h-4 w-4" />
                Creating...
              </>
            ) : (
              <>
                <Plus size={16} />
                Add Lecture
              </>
            )}
          </Button>

          <Button
            variant="ghost"
            className="w-full"
            onClick={() => navigate(`/teacher/courses/${courseId}`)}
          >
            ← Back to Course
          </Button>
        </div>
      </div>

      {/* 🔥 RIGHT: LECTURE LIST */}
      <div className="lg:col-span-2">
        <div className="bg-white dark:bg-gray-900 border rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Course Lectures</h2>
            <span className="text-sm text-gray-500">
              {lectures.length} lectures
            </span>
          </div>

          {lectureLoading ? (
            <LectureSkeleton />
          ) : lectureError ? (
            <p className="text-red-500 text-sm">Failed to load lectures</p>
          ) : lectures.length === 0 ? (
            <div className="text-center py-10 text-gray-500">
              No lectures yet. Start by adding one.
            </div>
          ) : (
            <div className="space-y-3">
              {lectures.map((lecture, index) => (
                <div
                  key={lecture._id}
                  className="p-4 border rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition"
                >
                  <Lecture
                    lecture={lecture}
                    courseId={courseId}
                    index={index}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CreateLecture;

// 🔥 SKELETON
const LectureSkeleton = () => {
  return (
    <div className="space-y-3 animate-pulse">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="h-16 bg-gray-300 rounded-xl" />
      ))}
    </div>
  );
};
