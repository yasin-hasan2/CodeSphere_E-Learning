import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import CourseTab from "./CourseTab";
import { ArrowRight } from "lucide-react";

const EditCourse = () => {
  return (
    <div className="space-y-6">
      {/* 🔥 HEADER */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Edit Course</h1>
          <p className="text-sm text-gray-500">
            Update your course details, content, and structure
          </p>
        </div>

        {/* CTA */}
        <Link to="lecture">
          <Button className="flex items-center gap-2">
            Go to Lectures
            <ArrowRight size={16} />
          </Button>
        </Link>
      </div>

      {/* 🔥 MAIN CONTENT */}
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-sm p-6">
        {/* Tabs Section */}
        <CourseTab />
      </div>
    </div>
  );
};

export default EditCourse;
