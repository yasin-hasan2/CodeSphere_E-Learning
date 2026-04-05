import { Menu, School } from "lucide-react";
// import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import DarkMode from "@/DarkMode";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { useLogOutUserMutation } from "@/features/api/authApi";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useSelector } from "react-redux";

function Navbar() {
  // const user = true;
  const { user } = useSelector((store) => store.auth);
  const [logOutUser, { data, error, isSuccess, isLoading }] =
    useLogOutUserMutation();

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navigate = useNavigate();
  // const role = "teacher";

  const logOutHandler = async () => {
    await logOutUser();
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(data?.message || "Logged out successfully");
      // redirect to home page
      // window.location.href = "/";
      navigate("/");
    }
  }, [data, error, isSuccess, isLoading, navigate]);

  return (
    <div
      className={`h-16 fixed top-0 left-0 right-0 z-50 transition-all duration-500
  ${
    scrolled
      ? "bg-black/60 backdrop-blur-xl border-b border-white/10 shadow-lg"
      : "bg-transparent"
  }`}
    >
      {/* Desktop */}
      <div className="max-w-7xl mx-auto hidden md:flex items-center justify-between h-full px-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 p-2 rounded-xl shadow-lg group-hover:scale-105 transition">
            <School className="text-white w-5 h-5" />
          </div>
          <span className="font-semibold text-white text-lg tracking-wide">
            CodeSphere
          </span>
        </Link>

        {/* Right Side */}
        <div className="flex items-center gap-6">
          <DarkMode />

          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="cursor-pointer ring-2 ring-white/10 hover:ring-white/30 transition">
                  <AvatarImage
                    src={user?.photoUrl || "https://github.com/shadcn.png"}
                  />
                  <AvatarFallback>CS</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>

              <DropdownMenuContent className="w-56 bg-black/80 backdrop-blur-xl border border-white/10 text-white">
                <DropdownMenuLabel className="text-zinc-400">
                  My Account
                </DropdownMenuLabel>
                <DropdownMenuSeparator />

                <DropdownMenuGroup>
                  <DropdownMenuItem asChild>
                    <Link to="/my-learning">My Learning</Link>
                  </DropdownMenuItem>

                  <DropdownMenuItem asChild>
                    <Link to="/profile">Profile</Link>
                  </DropdownMenuItem>

                  <DropdownMenuItem onClick={logOutHandler}>
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuGroup>

                {user?.role === "teacher" && (
                  <>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link to="/teacher/dashboard">Instructor Dashboard</Link>
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-3">
              <Link to="/login">
                <Button
                  variant="ghost"
                  className="text-white hover:bg-white/10 transition"
                >
                  Login
                </Button>
              </Link>

              <Link to="/login">
                <Button className="bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 hover:opacity-90 shadow-md">
                  Get Started
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Mobile */}
      <div className="flex md:hidden items-center justify-between px-4 h-full">
        <Link to="/" className="flex items-center gap-2">
          <School className="text-white w-5 h-5" />
          <span className="text-white font-semibold">CodeSphere</span>
        </Link>

        <MobileNavbar user={user} />
      </div>
    </div>
  );
}

export default Navbar;

{
  /* Mobile Navbar */
}

const MobileNavbar = ({ user }) => {
  const navigate = useNavigate();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="icon" variant="ghost" className="text-white">
          <Menu />
        </Button>
      </SheetTrigger>

      <SheetContent className="p-0 border-none bg-gradient-to-br from-slate-950 via-black to-slate-900 text-white">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
          <h1 className="font-semibold text-lg">CodeSphere</h1>
          <DarkMode />
        </div>

        {/* Navigation */}
        <div className="flex flex-col gap-5 px-5 py-6 text-base">
          <Link to="/" className="hover:text-blue-400 transition">
            Home
          </Link>

          <Link to="/my-learning" className="hover:text-blue-400 transition">
            My Learning
          </Link>

          <Link to="/profile" className="hover:text-blue-400 transition">
            Profile
          </Link>

          {user?.role === "teacher" && (
            <button
              onClick={() => navigate("/teacher/dashboard")}
              className="text-left hover:text-purple-400 transition"
            >
              Dashboard
            </button>
          )}
        </div>

        {/* Footer */}
        <div className="mt-auto px-5 pb-6">
          {user ? (
            <Button
              onClick={() => navigate("/")}
              className="w-full bg-gradient-to-r from-red-500 to-pink-500"
            >
              Logout
            </Button>
          ) : (
            <div className="flex flex-col gap-3">
              <Button
                onClick={() => navigate("/login")}
                variant="outline"
                className="border-white/20 text-white"
              >
                Login
              </Button>
              <Button
                onClick={() => navigate("/login")}
                className="bg-gradient-to-r from-blue-500 to-purple-500"
              >
                Signup
              </Button>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};
