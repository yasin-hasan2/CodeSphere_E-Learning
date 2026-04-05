export function FeaturedCourses() {
  const courses = Array.from({ length: 4 }).map((_, i) => ({
    title: `Modern Web Development ${i + 1}`,
    instructor: "John Doe",
    price: "$29",
  }));

  return (
    <section className="py-16 bg-gray-50 dark:bg-[#0f0f0f]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            Featured Courses
          </h2>
          <button className="text-blue-500">View All →</button>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {courses.map((course, i) => (
            <div
              key={i}
              className="bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition"
            >
              <div className="h-40 bg-gray-300"></div>

              <div className="p-5">
                <h3 className="font-semibold mb-2">{course.title}</h3>
                <p className="text-sm text-gray-500 mb-2">
                  {course.instructor}
                </p>
                <p className="font-bold text-blue-500">{course.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
