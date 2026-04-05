import { useGetCourseDetailWithStatusQuery } from "@/features/api/purchaseApi";
import { Navigate, useParams } from "react-router-dom";
import LoadingSpinner from "@/components/shared/LoadingSpinner";

const PurchaseCourseProtectedRoute = ({ children }) => {
  const { courseId } = useParams();
  const { data, isLoading } = useGetCourseDetailWithStatusQuery(courseId);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!data?.isPurchased) {
    return <div>You need to purchase this course first.</div>;
  }

  return data?.isPurchased ? (
    children
  ) : (
    <Navigate to={`/course-detail/${courseId}`} />
  );
};

export default PurchaseCourseProtectedRoute;
