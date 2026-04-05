export function StatsSection() {
  const stats = [
    { number: "50K+", label: "Students" },
    { number: "120+", label: "Courses" },
    { number: "80+", label: "Instructors" },
    { number: "95%", label: "Success Rate" },
  ];

  return (
    <section className="py-20 bg-white dark:bg-[#0f0f0f]">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        {stats.map((stat, i) => (
          <div key={i}>
            <h3 className="text-3xl font-bold text-blue-500">{stat.number}</h3>
            <p className="text-gray-500">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
