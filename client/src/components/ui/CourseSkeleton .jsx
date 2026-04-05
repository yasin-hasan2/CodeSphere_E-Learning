import { Skeleton } from "./skeleton";

const CourseSkeleton = () => {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition duration-300">
      {/* Image */}
      <Skeleton className="w-full h-40" />

      <div className="p-5 space-y-4">
        {/* Title */}
        <Skeleton className="h-5 w-3/4" />

        {/* Instructor */}
        <div className="flex items-center gap-3">
          <Skeleton className="h-8 w-8 rounded-full" />
          <Skeleton className="h-4 w-24" />
        </div>

        {/* Price + Rating */}
        <div className="flex justify-between items-center">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-12" />
        </div>
      </div>
    </div>
  );
};

export default CourseSkeleton;
