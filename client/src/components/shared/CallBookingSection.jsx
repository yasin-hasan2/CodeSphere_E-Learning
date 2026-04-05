import { useState } from "react";

export function CallBookingSection() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    course: "",
    date: "",
    time: "",
  });

  return (
    <section className="py-20 bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 text-white relative overflow-hidden">
      {/* 🔥 Background glow */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-white/10 blur-3xl rounded-full animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-black/20 blur-3xl rounded-full animate-pulse"></div>

      <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
        {/* LEFT: TEXT */}
        <div className="space-y-6 animate-fadeInUp">
          <h2 className="text-4xl font-extrabold leading-tight">
            Book a Free Consultation Call
          </h2>

          <p className="text-white/90 text-lg">
            Talk to our expert career advisors and make the right decision for
            your future. Get personalized guidance based on your goals and
            skills.
          </p>

          <div className="space-y-3 text-white/80">
            <p>✔ Get career direction tailored for you</p>
            <p>✔ Ask anything about courses & jobs</p>
            <p>✔ Learn from experienced mentors</p>
          </div>
        </div>

        {/* RIGHT: FORM */}
        <div className="bg-white/10 backdrop-blur-xl p-8 rounded-2xl shadow-2xl animate-fadeInUp delay-200">
          <h3 className="text-xl font-semibold mb-6 text-white">
            Schedule Your Call
          </h3>

          <div className="space-y-4">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full px-4 py-3 rounded-lg bg-white/20 placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white"
            />

            <input
              type="text"
              placeholder="Phone Number"
              className="w-full px-4 py-3 rounded-lg bg-white/20 placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white"
            />

            <select className="w-full px-4 py-3 rounded-lg bg-white/20 text-white focus:outline-none">
              <option className="text-black">Select Course</option>
              <option className="text-black">Web Development</option>
              <option className="text-black">UI/UX Design</option>
              <option className="text-black">Digital Marketing</option>
            </select>

            <input
              type="date"
              className="w-full px-4 py-3 rounded-lg bg-white/20 text-white focus:outline-none"
            />

            <input
              type="time"
              className="w-full px-4 py-3 rounded-lg bg-white/20 text-white focus:outline-none"
            />

            <button className="w-full bg-white text-indigo-600 py-3 rounded-lg font-semibold hover:shadow-lg transform hover:-translate-y-1 transition">
              Book Free Call
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
