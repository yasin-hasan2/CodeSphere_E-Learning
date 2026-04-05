export function WhyChooseUs() {
  const items = [
    {
      title: "Expert Instructors",
      desc: "Learn from real industry professionals.",
    },
    { title: "Flexible Learning", desc: "Study anytime, anywhere." },
    { title: "Career Support", desc: "Get help to land your dream job." },
    { title: "Certification", desc: "Earn recognized certificates." },
  ];

  return (
    <section className="py-20 bg-white dark:bg-[#0f0f0f]">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-12 text-gray-900 dark:text-white">
          Why Learn With Us?
        </h2>

        <div className="grid md:grid-cols-4 gap-8">
          {items.map((item, i) => (
            <div key={i} className="p-6 rounded-xl hover:shadow-lg transition">
              <div className="text-4xl mb-4">✨</div>
              <h3 className="font-semibold mb-2">{item.title}</h3>
              <p className="text-sm text-gray-500">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
