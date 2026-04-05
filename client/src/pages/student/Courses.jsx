// import { Skeleton } from "@/components/ui/skeleton";
import Course from "./Course";
import { useGetPublishedCoursesQuery } from "@/features/api/courseApi";
import CourseSkeleton from "@/components/ui/CourseSkeleton ";

function Courses() {
  const { data, isLoading, isError } = useGetPublishedCoursesQuery();

  if (isError) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-center">
        <p className="text-red-500 text-lg">Something went wrong. Try again.</p>
      </div>
    );
  }

  return (
    <section className="bg-gray-50 dark:bg-[#0f0f0f] py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* 🔥 Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-3">
            Explore Our Courses
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-lg max-w-2xl mx-auto">
            Learn new skills, grow your career, and achieve your goals with our
            expert-led courses.
          </p>
        </div>

        {/* 🔥 Courses Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {isLoading ? (
            Array.from({ length: 8 }).map((_, index) => (
              <CourseSkeleton key={index} />
            ))
          ) : data?.courses?.length > 0 ? (
            data.courses.map((course, index) => (
              <Course key={index} course={course} />
            ))
          ) : (
            <div className="col-span-full text-center py-20">
              <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
                No Courses Found
              </h3>
              <p className="text-gray-500">
                Please check back later or explore other categories.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default Courses;
