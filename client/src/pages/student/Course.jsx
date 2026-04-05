import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

function Course({ course }) {
  return (
    <Link to={`/course-detail/${course._id}`}>
      <div className="group bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition duration-500">
        {/* 🔥 Thumbnail */}
        <div className="relative overflow-hidden">
          <img
            src={course.courseThumbnail}
            alt="course"
            className="w-full h-44 object-cover transform group-hover:scale-110 transition duration-500"
          />

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

          {/* Level badge */}
          <Badge className="absolute top-3 left-3 bg-white/90 text-gray-900 backdrop-blur px-3 py-1 text-xs rounded-full">
            {course.courseLevel}
          </Badge>
        </div>

        {/* 🔥 Content */}
        <div className="p-5 space-y-4">
          {/* Title */}
          <h3 className="font-semibold text-lg text-gray-900 dark:text-white line-clamp-2 group-hover:text-blue-500 transition">
            {course.courseTitle}
          </h3>

          {/* Instructor */}
          <div className="flex items-center gap-3">
            <Avatar className="h-9 w-9">
              <AvatarImage
                src={
                  course.courseTeacher?.photoUrl ||
                  "https://github.com/shadcn.png"
                }
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>

            <p className="text-sm text-gray-600 dark:text-gray-400">
              {course.courseTeacher?.name || "Instructor"}
            </p>
          </div>

          {/* Rating + Students (demo) */}
          <div className="flex items-center justify-between text-sm text-gray-500">
            <span>⭐ 4.8</span>
            <span>1.2k students</span>
          </div>

          {/* Price */}
          <div className="flex items-center justify-between">
            <span className="line-through text-gray-400 text-sm">৳1200</span>
            <span className="text-green-500 text-sm">20% OFF</span>

            <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full">
              Bestseller
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default Course;
