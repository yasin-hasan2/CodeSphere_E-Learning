import { useLoadUserQuery } from "@/features/api/authApi";
import Course from "./Course";
import { BookOpen } from "lucide-react";

function MyLearning() {
  const { data, isLoading } = useLoadUserQuery();
  const myLearning = data?.user?.enrolledCourses || [];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* 🔥 HEADER */}
      <div className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-2xl p-6 md:p-8 shadow-lg mb-8">
        <h1 className="text-2xl md:text-3xl font-bold">My Learning Journey</h1>
        <p className="text-sm mt-2 opacity-90">
          Keep going. Every lesson brings you closer to your goal.
        </p>

        <div className="mt-4 flex items-center gap-4 text-sm">
          <span className="bg-white/20 px-3 py-1 rounded-full">
            📚 {myLearning.length} Courses
          </span>
        </div>
      </div>

      {/* 🔥 CONTENT */}
      {isLoading ? (
        <MyLearningSkeleton />
      ) : myLearning.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-center py-16 bg-gray-100 dark:bg-gray-800 rounded-2xl">
          <BookOpen size={40} className="text-gray-400 mb-4" />
          <h2 className="text-lg font-semibold">No courses yet</h2>
          <p className="text-sm text-gray-500 mt-1">
            Start learning by enrolling in a course.
          </p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {myLearning.map((course) => (
            <div
              key={course._id}
              className="transform hover:-translate-y-1 hover:shadow-xl transition duration-300"
            >
              <Course course={course} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyLearning;

/* 🔥 Skeleton Loader */
const MyLearningSkeleton = () => {
  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="rounded-xl overflow-hidden bg-white dark:bg-gray-800 shadow animate-pulse"
        >
          <div className="h-32 bg-gray-300 dark:bg-gray-700"></div>
          <div className="p-4 space-y-3">
            <div className="h-4 w-3/4 bg-gray-300 dark:bg-gray-700 rounded"></div>
            <div className="h-3 w-1/2 bg-gray-300 dark:bg-gray-700 rounded"></div>
          </div>
        </div>
      ))}
    </div>
  );
};
