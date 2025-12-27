import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetCreatorCourseQuery } from "@/features/api/courseApi";
import { Edit } from "lucide-react";
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom"; // added useLocation

const CourseTable = () => {
  const { data, isLoading } = useGetCreatorCourseQuery();
  const navigate = useNavigate();
  const location = useLocation(); // added
  const [filter, setFilter] = useState("All"); // Added filter state

  if (isLoading) return <h1>Loading...</h1>;

  console.log("course Data", data);

  // derive safe courses array and apply filter
  const courses = data?.courses || [];
  const filteredCourses = courses.filter((c) => {
    if (filter === "All") return true;
    if (filter === "Published") return c?.isPublished;
    if (filter === "Draft") return !c?.isPublished;
    return true;
  });

  return (
    <div>
      {/* show current path (e.g. "/teacher/courses") */}
      <div className="mb-2 text-sm text-gray-600">{location.pathname}</div>

      <div className="flex items-center justify-between mb-4">
        <div className="flex gap-2">
          <Button onClick={() => navigate(`/teacher/course/create`)}>
            Create a new course
          </Button>
          {/* Navigation buttons for filtering */}
          <div className="flex items-center gap-1 ml-2">
            <Button
              size="sm"
              variant={filter === "All" ? "default" : "ghost"}
              onClick={() => setFilter("All")}
            >
              All
            </Button>
            <Button
              size="sm"
              variant={filter === "Published" ? "default" : "ghost"}
              onClick={() => setFilter("Published")}
            >
              Published
            </Button>
            <Button
              size="sm"
              variant={filter === "Draft" ? "default" : "ghost"}
              onClick={() => setFilter("Draft")}
            >
              Draft
            </Button>
          </div>
        </div>
        {/* optional space for future controls */}
      </div>
      <Table>
        <TableCaption>A list of your recent courses.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Price</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {/* use filteredCourses instead of data.courses */}
          {filteredCourses.map((course) => (
            <TableRow key={course._id}>
              <TableCell className="font-medium">
                {course?.coursePrice || "NA"}
              </TableCell>
              <TableCell>
                {" "}
                <Badge>
                  {course?.isPublished ? "Published" : "Draft"}
                </Badge>{" "}
              </TableCell>
              <TableCell>{course?.courseTitle}</TableCell>
              <TableCell>
                {course?.createdAt
                  ? new Date(course.createdAt).toLocaleDateString()
                  : ""}
              </TableCell>
              <TableCell className="text-right">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => navigate(`${course?._id}`)}
                >
                  <Edit />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default CourseTable;
