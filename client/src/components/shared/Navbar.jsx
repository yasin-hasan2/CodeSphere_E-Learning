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
import { useEffect } from "react";
import { toast } from "sonner";
import { useSelector } from "react-redux";

function Navbar() {
  // const user = true;
  const { user } = useSelector((store) => store.auth);
  const [logOutUser, { data, error, isSuccess, isLoading }] =
    useLogOutUserMutation();

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
    <div className="h-16 dark:bg-[#020817] bg-white border-b dark:border-b-gray-800 border-b-gray-200 sticky top-0 left-0 right-0 duration-300 z-10 ">
      {/* Desktop Navbar */}
      <div className="max-w-7xl mx-auto hidden md:flex justify-between items-center gap-10 h-full">
        <div className="flex items-center gap-2">
          <School size={"30"} />
          <Link to={"/"} className="text-decoration-none cursor-pointer ">
            <h className="hidden md:block font-extrabold text-2xl">
              CodesPhere
            </h>
          </Link>
        </div>
        {/* User icons and dark mode icon  */}
        <div className="flex items-center gap-8">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar>
                  <AvatarImage
                    src={user?.photoUrl || "https://github.com/shadcn.png"}
                    alt="@shadcn"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <Link to="/my-learning">My learning</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    {" "}
                    <Link to="/profile"> Profile</Link>{" "}
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <button
                      onClick={logOutHandler}
                      // className="flex w-full items-center justify-between"
                    >
                      <span>Log out</span>
                    </button>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                {user?.role === "teacher" && (
                  <>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <Link to="/teacher/dashboard">Dashboard</Link>
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-2">
              <Link to={"/login"}>
                <Button variant="outline">Login</Button>
              </Link>
              <Link to={"/login"}>
                <Button>Signup</Button>
              </Link>
            </div>
          )}
          <DarkMode />
        </div>
      </div>
      {/* Mobile device  */}
      <div className="flex md:hidden items-center justify-between px-4 h-full">
        <h1 className="font-extrabold text-2xl">E-learning</h1>
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
  // const role = "instructor";
  // const { user } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  return (
    <div>
      <Sheet>
        <SheetTrigger asChild>
          <Button
            size="icon"
            className="rounded-full hover:bg-gray-200"
            variant="outline"
          >
            <Menu />
          </Button>
        </SheetTrigger>
        <SheetContent className="flex flex-col">
          <SheetHeader className="flex flex-row items-center justify-between mt-2">
            <SheetTitle>
              {" "}
              <a to="/">CodesPhere E-Learning</a>
            </SheetTitle>
            <DarkMode />
          </SheetHeader>
          {/* <Separator className="mr-2" /> */}
          <nav className="flex flex-col space-y-4">
            <Link to="/my-learning">My Learning</Link>
            <Link to="/profile">Edit Profile</Link>
            <p>Log out</p>
          </nav>
          {user?.role === "teacher" && (
            <SheetFooter>
              <SheetClose asChild>
                <Button
                  type="submit"
                  onClick={() => navigate("/teacher/dashboard")}
                >
                  Dashboard
                </Button>
              </SheetClose>
            </SheetFooter>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
};
