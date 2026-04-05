/** @type {import('tailwindcss').Config} */
import tailwindAnimate from "tailwindcss-animate";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      animation: {
        fadeInUp: "fadeInUp 0.8s ease-out forwards",
      },
      colors: {
        brand: {
          blue: "#3B82F6",
          indigo: "#6366F1",
          purple: "#8B5CF6",
        },
      },
      backgroundImage: {
        "brand-gradient":
          "linear-gradient(to right, #3B82F6, #6366F1, #8B5CF6)",
      },
      boxShadow: {
        glow: "0 0 40px rgba(99,102,241,0.4)",
      },
      keyframes: {
        fadeInUp: {
          "0%": {
            opacity: "0",
            transform: "translateY(40px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
      },
    },
  },
  plugins: [tailwindAnimate],
};

// export default {
//   content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
//   theme: {
//     extend: {

//     },
//   },
// };
