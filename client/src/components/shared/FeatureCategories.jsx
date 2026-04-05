export function FeatureCategories() {
  const features = [
    { title: "Career Skills", icon: "📊" },
    { title: "Free Courses", icon: "🎓" },
    { title: "Industry Training", icon: "🏢" },
    { title: "Web Development", icon: "💻" },
  ];

  return (
    <section className="py-16 bg-white dark:bg-[#0f0f0f]">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl font-bold mb-10 text-gray-900 dark:text-white">
          What do you want to learn?
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {features.map((item, i) => (
            <div
              key={i}
              className="p-6 bg-gray-50 dark:bg-gray-900 rounded-xl hover:shadow-xl transition cursor-pointer text-center"
            >
              <div className="text-3xl mb-3">{item.icon}</div>
              <h3 className="font-medium">{item.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
