export function CTASection() {
  return (
    <section className="py-20 bg-white text-center text-black dark:bg-[#0f0f0f] dark:text-white">
      <h2 className="text-3xl font-bold mb-4">Start Learning Today</h2>
      <p className="mb-6">
        Join thousands of learners and upgrade your skills.
      </p>

      <div className="flex justify-center gap-4">
        <button className="bg-white text-blue-600 px-6 py-3 rounded-full font-semibold">
          Get Started
        </button>
        <button className="border border-white px-6 py-3 rounded-full">
          Browse Courses
        </button>
      </div>
    </section>
  );
}
