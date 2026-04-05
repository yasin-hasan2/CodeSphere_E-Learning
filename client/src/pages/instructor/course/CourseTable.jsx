import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetCreatorCourseQuery } from "@/features/api/courseApi";
import { Edit, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const CourseTable = () => {
  const { data, isLoading } = useGetCreatorCourseQuery();
  const navigate = useNavigate();
  const [filter, setFilter] = useState("All");

  const courses = data?.courses || [];

  const filteredCourses = courses.filter((c) => {
    if (filter === "Published") return c?.isPublished;
    if (filter === "Draft") return !c?.isPublished;
    return true;
  });

  if (isLoading) return <CourseTableSkeleton />;

  return (
    <div className="space-y-6">
      {/* 🔥 HEADER */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Your Courses</h1>
          <p className="text-sm text-gray-500">
            Manage and update your courses
          </p>
        </div>

        <Button
          onClick={() => navigate(`/teacher/course/create`)}
          className="flex items-center gap-2"
        >
          <Plus size={18} />
          Create Course
        </Button>
      </div>

      {/* 🔥 FILTER TABS */}
      <div className="flex gap-2 bg-gray-100 dark:bg-gray-800 p-1 rounded-xl w-fit">
        {["All", "Published", "Draft"].map((item) => (
          <button
            key={item}
            onClick={() => setFilter(item)}
            className={`px-4 py-1.5 rounded-lg text-sm transition-all
              ${
                filter === item
                  ? "bg-white dark:bg-gray-900 shadow font-medium"
                  : "text-gray-500 hover:text-black dark:hover:text-white"
              }`}
          >
            {item}
          </button>
        ))}
      </div>

      {/* 🔥 TABLE */}
      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50 dark:bg-gray-900">
              <TableHead>Course</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {filteredCourses.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="text-center py-10 text-gray-500"
                >
                  No courses found
                </TableCell>
              </TableRow>
            ) : (
              filteredCourses.map((course) => (
                <TableRow
                  key={course._id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-900 transition"
                >
                  {/* COURSE TITLE */}
                  <TableCell className="font-medium">
                    {course?.courseTitle}
                  </TableCell>

                  {/* PRICE */}
                  <TableCell>৳{course?.coursePrice || 0}</TableCell>

                  {/* STATUS */}
                  <TableCell>
                    <Badge
                      className={`px-2 py-1 text-xs rounded-full
                        ${
                          course?.isPublished
                            ? "bg-green-100 text-green-600"
                            : "bg-yellow-100 text-yellow-600"
                        }`}
                    >
                      {course?.isPublished ? "Published" : "Draft"}
                    </Badge>
                  </TableCell>

                  {/* DATE */}
                  <TableCell>
                    {course?.createdAt
                      ? new Date(course.createdAt).toLocaleDateString()
                      : ""}
                  </TableCell>

                  {/* ACTION */}
                  <TableCell className="text-right">
                    <Button
                      size="sm"
                      variant="ghost"
                      className="hover:bg-gray-200 dark:hover:bg-gray-800 rounded-lg"
                      onClick={() => navigate(`${course?._id}`)}
                    >
                      <Edit size={18} />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default CourseTable;

// 🔥 SKELETON
const CourseTableSkeleton = () => {
  return (
    <div className="space-y-4 animate-pulse">
      <div className="h-6 w-40 bg-gray-300 rounded" />

      <div className="h-10 w-64 bg-gray-300 rounded" />

      <div className="space-y-2">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-12 bg-gray-300 rounded" />
        ))}
      </div>
    </div>
  );
};
