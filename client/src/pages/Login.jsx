import { AppWindowIcon, CodeIcon, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useState } from "react";
import {
  useLoginUserMutation,
  useRegisterUserMutation,
} from "@/features/api/authApi";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";

const Login = () => {
  // const { user } = useSelector((store) => store.auth);
  const navigate = useNavigate();

  // ✅ Track which tab is active
  const [activeTab, setActiveTab] = useState("login");

  // Signup and login input states
  const [signupInput, setSignupInput] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loginInput, setLoginInput] = useState({ email: "", password: "" });

  // API hooks
  const [
    registerUser,
    {
      data: registerData,
      error: registerError,
      isLoading: registerIsLoading,
      isSuccess: registerIsSuccess,
    },
  ] = useRegisterUserMutation();

  const [
    loginUser,
    {
      data: loginData,
      error: loginError,
      isLoading: loginIsLoading,
      isSuccess: loginIsSuccess,
    },
  ] = useLoginUserMutation();

  // Input change handler
  const changeInputHandler = (e, type) => {
    const { name, value } = e.target;
    if (type === "signup") {
      setSignupInput((prev) => ({ ...prev, [name]: value }));
    } else {
      setLoginInput((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Handle signup/login submission
  const handleRegistration = async (type) => {
    const inputData = type === "signup" ? signupInput : loginInput;
    const action = type === "signup" ? registerUser : loginUser;
    await action(inputData);
  };

  // Handle success/error responses
  useEffect(() => {
    if (registerIsSuccess && registerData) {
      toast.success(registerData.message || "Signup Successfully");
      // ✅ Switch to login tab after signup success
      setActiveTab("login");
    }

    if (registerError) {
      toast.error(registerError.data?.message || "Signup Failed");
    }

    if (loginIsSuccess && loginData) {
      toast.success(loginData.message || "Login Successfully");
      navigate("/"); // redirect to home or dashboard
    }

    if (loginError) {
      toast.error(loginError.data?.message || "Login Failed");
    }
  }, [
    registerIsSuccess,
    registerData,
    registerError,
    loginIsSuccess,
    loginData,
    loginError,
    navigate,
  ]);

  return (
    <div className="min-h-screen flex">
      {/* LEFT SIDE (Branding) */}
      <div className="hidden md:flex w-1/2 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 items-center justify-center p-10">
        <div className="text-center text-white space-y-6">
          <div className="text-6xl font-bold tracking-tight">{"</>"}</div>
          <h1 className="text-4xl font-semibold leading-tight">
            Learn. Build. Grow.
          </h1>
          <p className="text-sm text-white/80 max-w-sm mx-auto">
            CodeSphere helps you level up your development skills with
            real-world learning.
          </p>
        </div>
      </div>

      {/* RIGHT SIDE (Auth Card) */}
      <div className="flex w-full md:w-1/2 items-center justify-center bg-slate-950 px-6">
        <div className="w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-6 space-y-6">
          {/* Logo */}
          <div className="text-center">
            <h2 className="text-xl font-semibold text-white">CodeSphere</h2>
            <p className="text-sm text-zinc-400">Welcome back 👋</p>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-2 bg-white/10 rounded-lg p-1">
              <TabsTrigger
                value="login"
                className="data-[state=active]:bg-white data-[state=active]:text-black rounded-md"
              >
                Login
              </TabsTrigger>
              <TabsTrigger
                value="signup"
                className="data-[state=active]:bg-white data-[state=active]:text-black rounded-md"
              >
                Signup
              </TabsTrigger>
            </TabsList>

            {/* LOGIN */}
            <TabsContent value="login">
              <div className="space-y-4 mt-4">
                <Input
                  type="email"
                  placeholder="Email"
                  name="email"
                  value={loginInput.email}
                  onChange={(e) => changeInputHandler(e, "login")}
                  className="bg-white/5 border-white/10 text-white"
                />

                <Input
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={loginInput.password}
                  onChange={(e) => changeInputHandler(e, "login")}
                  className="bg-white/5 border-white/10 text-white"
                />

                <Button
                  disabled={loginIsLoading}
                  onClick={() => handleRegistration("login")}
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:opacity-90"
                >
                  {loginIsLoading ? (
                    <Loader2 className="animate-spin" />
                  ) : (
                    "Login"
                  )}
                </Button>
              </div>
            </TabsContent>

            {/* SIGNUP */}
            <TabsContent value="signup">
              <div className="space-y-4 mt-4">
                <Input
                  placeholder="Name"
                  name="name"
                  value={signupInput.name}
                  onChange={(e) => changeInputHandler(e, "signup")}
                  className="bg-white/5 border-white/10 text-white"
                />

                <Input
                  type="email"
                  placeholder="Email"
                  name="email"
                  value={signupInput.email}
                  onChange={(e) => changeInputHandler(e, "signup")}
                  className="bg-white/5 border-white/10 text-white"
                />

                <Input
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={signupInput.password}
                  onChange={(e) => changeInputHandler(e, "signup")}
                  className="bg-white/5 border-white/10 text-white"
                />

                <Button
                  disabled={registerIsLoading}
                  onClick={() => handleRegistration("signup")}
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:opacity-90"
                >
                  {registerIsLoading ? (
                    <Loader2 className="animate-spin" />
                  ) : (
                    "Create Account"
                  )}
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Login;
