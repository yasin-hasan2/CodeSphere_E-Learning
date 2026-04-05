import { Button } from "@/components/ui/button";
import { ArrowLeft, FileEdit } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import LectureTab from "./LectureTab";

function EditLecture() {
  const { courseId } = useParams();

  return (
    <div className="max-w-5xl mx-auto px-4">
      {/* 🔥 HEADER */}
      <div className="flex items-center justify-between mb-6">
        {/* LEFT */}
        <div className="flex items-center gap-3">
          <Link to={`/teacher/courses/${courseId}/lecture`}>
            <Button
              size="icon"
              variant="outline"
              className="rounded-full hover:scale-105 transition"
            >
              <ArrowLeft size={16} />
            </Button>
          </Link>

          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <FileEdit size={20} />
              Edit Lecture
            </h1>
            <p className="text-sm text-gray-500">
              Update lecture content, video, and resources
            </p>
          </div>
        </div>

        {/* RIGHT (optional future actions) */}
        <div className="hidden sm:flex items-center gap-2">
          <Button variant="outline">Preview</Button>
          <Button>Save Changes</Button>
        </div>
      </div>

      {/* 🔥 MAIN CARD */}
      <div className="bg-white dark:bg-gray-900 border rounded-2xl p-6 shadow-sm">
        <LectureTab />
      </div>
    </div>
  );
}

export default EditLecture;
