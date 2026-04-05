export function TestimonialSection() {
  return (
    <section className="py-20 bg-gray-50 dark:bg-[#0f0f0f]">
      <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-10 items-center">
        {/* Text */}
        <div>
          <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
            What Our Students Say
          </h2>
          <p className="text-gray-600 mb-4">
            This platform helped me transform my career and land my first remote
            job.
          </p>
          <p className="font-semibold">— Alex Rahman</p>
        </div>

        {/* Video */}
        <div className="bg-gray-300 h-64 rounded-xl flex items-center justify-center">
          ▶
        </div>
      </div>
    </section>
  );
}
