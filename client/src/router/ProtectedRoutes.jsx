import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export const ProtectedRoutes = ({ children }) => {
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  if (isAuthenticated === false || !user) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export const AuthenticatedUser = ({ children }) => {
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  if (isAuthenticated === true && user) {
    return <Navigate to="/" replace />;
  }
  return children;
};

export const TeacherRoutes = ({ children }) => {
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  if (isAuthenticated === false || !user) {
    return <Navigate to="/login" replace />;
  }
  if (user.role !== "teacher") {
    return <Navigate to="/" replace />;
  }
  return children;
};
// export const AdminRoutes = ({ children }) => {
//   const { user, isAuthenticated } = useSelector((state) => state.auth);
//   if (isAuthenticated === false || !user) {
//     return <Navigate to="/login" replace />;
//   }
//   if (user.role !== "admin") {
//     return <Navigate to="/" replace />;
//   }
//   return children;
// };
// export const StudentRoutes = ({ children }) => {
//   const { user, isAuthenticated } = useSelector((state) => state.auth);
//   if (isAuthenticated === false || !user) {
//     return <Navigate to="/login" replace />;
//   }
//   if (user.role !== "student") {
//     return <Navigate to="/" replace />;
//   }
//   return children;
// };
