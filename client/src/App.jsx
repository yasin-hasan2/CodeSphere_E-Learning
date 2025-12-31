// import "./App.css";

import { createBrowserRouter } from "react-router-dom";
import Navbar from "./components/shared/Navbar";
import Login from "./pages/Login";
import HeroSection from "./pages/student/HeroSection";
import MainLayout from "./layout/MainLayout";
import { RouterProvider } from "react-router";
import Courses from "./pages/student/Courses";
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

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: (
          <>
            <HeroSection />
            <Courses />
          </>
        ),
      },
      {
        path: "login",
        element: (
          <AuthenticatedUser>
            {" "}
            <Login />
          </AuthenticatedUser>
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
