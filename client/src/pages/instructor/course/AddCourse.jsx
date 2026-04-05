import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCreateCourseMutation } from "@/features/api/courseApi";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const AddCourse = () => {
  const [courseTitle, setCourseTitle] = useState("");
  const [category, setCategory] = useState("");

  const [createCourse, { data, isLoading, error, isSuccess }] =
    useCreateCourseMutation();

  const navigate = useNavigate();

  const createCourseHandler = async () => {
    if (!courseTitle || !category) {
      return toast.error("Please fill all fields");
    }
    await createCourse({ courseTitle, category });
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(data?.message || "Course created successfully");
      navigate("/teacher/courses");
    }
  }, [isSuccess, data, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gray-50 dark:bg-[#0f0f0f]">
      {/* 🔥 CARD */}
      <div className="w-full max-w-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-sm p-8 space-y-6">
        {/* HEADER */}
        <div>
          <h1 className="text-2xl font-bold">Create New Course</h1>
          <p className="text-sm text-gray-500 mt-1">
            Add basic details to get started with your course
          </p>
        </div>

        {/* FORM */}
        <div className="space-y-5">
          {/* TITLE */}
          <div className="space-y-2">
            <Label>Course Title</Label>
            <Input
              type="text"
              value={courseTitle}
              onChange={(e) => setCourseTitle(e.target.value)}
              placeholder="e.g. Complete MERN Stack Bootcamp"
              className="h-11"
            />
          </div>

          {/* CATEGORY */}
          <div className="space-y-2">
            <Label>Category</Label>
            <Select onValueChange={(value) => setCategory(value)}>
              <SelectTrigger className="w-full h-11">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>

              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Categories</SelectLabel>
                  <SelectItem value="React">React</SelectItem>
                  <SelectItem value="Next JS">Next JS</SelectItem>
                  <SelectItem value="Fullstack">
                    Fullstack Development
                  </SelectItem>
                  <SelectItem value="MERN">MERN Stack</SelectItem>
                  <SelectItem value="Python">Python</SelectItem>
                  <SelectItem value="Data Science">Data Science</SelectItem>
                  <SelectItem value="Docker">Docker</SelectItem>
                  <SelectItem value="MongoDB">MongoDB</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* ACTIONS */}
        <div className="flex items-center justify-between pt-4">
          <Button variant="ghost" onClick={() => navigate("/teacher/courses")}>
            ← Back
          </Button>

          <Button
            disabled={isLoading}
            onClick={createCourseHandler}
            className="px-6"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating...
              </>
            ) : (
              "Create Course"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddCourse;
