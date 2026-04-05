// import "./App.css";

import { createBrowserRouter } from "react-router-dom";
import Navbar from "./components/shared/Navbar";
import Login from "./pages/Login";
import HeroSection from "./pages/student/HeroSection";
import MainLayout from "./layout/MainLayout";
import { RouterProvider } from "react-router";
import Courses from "./pages/student/Courses";
import ErrorPage from "./pages/ErrorPage";
import MyLearning from "./pages/student/MyLearning";
import Profile from "./pages/student/Profile";
import Sidebar from "./pages/instructor/Sidebar";
import Dashboard from "./pages/instructor/Dashboard";
import CourseTable from "./pages/instructor/course/CourseTable";
import AddCourse from "./pages/instructor/course/AddCourse";
import EditCourse from "./pages/instructor/course/EditCourse";
import CreateLecture from "./pages/instructor/lecture/CreateLecture";
import EditLecture from "./pages/instructor/lecture/EditLecture";
import CourseDetail from "./pages/student/CourseDetail";
import CourseProgress from "./pages/student/CourseProgress";
import SearchPage from "./pages/student/SearchPage";
import {
  AuthenticatedUser,
  ProtectedRoutes,
  TeacherRoutes,
} from "./router/ProtectedRoutes";
import PurchaseCourseProtectedRoute from "./router/PurchaseCourseProtectedRoute";
import { ThemeProvider } from "./components/shared/ThemeProvider";
import AuthLayout from "./layout/AuthLayout";
import { FeatureCategories } from "./components/shared/FeatureCategories";
import { FeaturedCourses } from "./components/shared/FeaturedCourses";
import { WhyChooseUs } from "./components/shared/WhyChooseUs";
import { PopularCourses } from "./components/shared/PopularCourses";
import { StatsSection } from "./components/shared/StatsSection";
import { TestimonialSection } from "./components/shared/TestimonialSection";
import { CTASection } from "./components/shared/CTASection";
import { CallBookingSection } from "./components/shared/CallBookingSection";

const appRouter = createBrowserRouter([
  {
    element: <AuthLayout />, // ❌ Navbar থাকবে না
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      // {
      //   path: "/signup",
      //   element: <Login />, // or separate Signup page
      // },
    ],
  },
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: (
          <>
            <HeroSection />
            <FeatureCategories />
            <Courses />
            <FeaturedCourses />
            <WhyChooseUs />
            <PopularCourses />
            <StatsSection />
            <TestimonialSection />
            <CallBookingSection />
            <CTASection />
          </>
        ),
      },
      {
        path: "my-learning",
        element: (
          <ProtectedRoutes>
            <MyLearning />
          </ProtectedRoutes>
        ),
      },
      {
        path: "profile",
        element: (
          <ProtectedRoutes>
            <Profile />
          </ProtectedRoutes>
        ),
      },
      {
        path: "course/search",
        element: <SearchPage />,
      },
      {
        path: "course-detail/:courseId",
        element: <CourseDetail />,
      },
      {
        path: "course-progress/:courseId",
        element: (
          <ProtectedRoutes>
            <PurchaseCourseProtectedRoute>
              <CourseProgress />
            </PurchaseCourseProtectedRoute>
          </ProtectedRoutes>
        ),
      },
      {
        path: "*",
        element: <ErrorPage />,
      },
      // admin routes start from here
      {
        path: "/teacher",
        element: (
          <TeacherRoutes>
            <Sidebar />
          </TeacherRoutes>
        ),
        children: [
          {
            path: "dashboard",
            element: <Dashboard />,
          },
          {
            path: "courses",
            element: <CourseTable />,
          },
          {
            path: "course/create",
            element: <AddCourse />,
          },
          {
            path: "courses/:courseId",
            element: <EditCourse />,
          },
          {
            path: "courses/:courseId/lecture",
            element: <CreateLecture />,
          },
          {
            path: "courses/:courseId/lecture/:lectureId",
            element: <EditLecture />,
          },
        ],
      },
    ],
  },
]);

function App() {
  return (
    <main className="App">
      <ThemeProvider>
        <RouterProvider router={appRouter} />
      </ThemeProvider>
    </main>
  );
}

export default App;
