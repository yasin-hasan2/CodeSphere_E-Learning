import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function HeroSection() {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const searchHandler = (e) => {
    e.preventDefault();
    if (searchQuery.trim() !== "") {
      navigate(`/course/search?query=${searchQuery}`);
    }
    setSearchQuery("");
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 dark:from-gray-900 dark:to-black px-4 text-center overflow-hidden">
      {/* 🔥 Decorative blur shapes */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-purple-500/30 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-blue-400/20 rounded-full blur-2xl animate-pulse"></div>

      <div className="max-w-3xl mx-auto z-10">
        <h1 className="text-white text-5xl md:text-6xl font-extrabold mb-4 drop-shadow-lg">
          Learn Without Limits
        </h1>

        <p className="text-gray-100 text-lg md:text-xl mb-10">
          Upgrade your skills with high-quality courses anytime, anywhere
        </p>

        {/* Search */}
        <form
          onSubmit={searchHandler}
          className="flex items-center bg-white dark:bg-gray-800 rounded-full shadow-2xl overflow-hidden max-w-2xl mx-auto mb-6 hover:scale-105 transition"
        >
          <Input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search Courses..."
            className="flex-grow border-none focus-visible:ring-0 px-6 py-4 text-gray-900 dark:text-gray-100"
          />
          <Button className="bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 text-white px-6 py-4 rounded-r-full">
            Search
          </Button>
        </form>

        {/* CTA */}
        <Button
          onClick={() => navigate(`/course/search?query`)}
          className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:shadow-lg transform hover:-translate-y-1 transition"
        >
          Explore Courses
        </Button>
      </div>
    </div>
  );
}

export default HeroSection;
