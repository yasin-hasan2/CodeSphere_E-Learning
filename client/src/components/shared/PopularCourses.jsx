export function PopularCourses() {
  const courses = Array.from({ length: 4 }).map((_, i) => ({
    title: `UI/UX Mastery ${i + 1}`,
  }));

  return (
    <section className="py-16 bg-gray-50 dark:bg-[#0f0f0f]">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-10 text-gray-900 dark:text-white">
          Popular Courses
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {courses.map((course, i) => (
            <div
              key={i}
              className="bg-white dark:bg-gray-900 p-5 rounded-xl shadow hover:shadow-xl"
            >
              <div className="h-36 bg-gray-300 mb-4 rounded"></div>
              <h3 className="font-semibold">{course.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
