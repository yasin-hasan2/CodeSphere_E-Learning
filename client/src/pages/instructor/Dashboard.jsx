import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetPurchasedCoursesQuery } from "@/features/api/purchaseApi";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { DollarSign, ShoppingCart } from "lucide-react";

const Dashboard = () => {
  const { data, isError, isLoading } = useGetPurchasedCoursesQuery();

  if (isLoading) return <DashboardSkeleton />;
  if (isError)
    return (
      <div className="text-center mt-10 text-red-500 font-medium">
        Failed to load dashboard data
      </div>
    );

  const purchasedCourses = data?.purchasedCourses || [];

  const courseData = purchasedCourses.map((course) => ({
    name: course.courseId?.courseTitle,
    price: course.courseId?.coursePrice,
  }));

  const totalRevenue = purchasedCourses.reduce(
    (acc, el) => acc + (el.amount || 0),
    0,
  );

  const totalSales = purchasedCourses.length;

  return (
    <div className="space-y-8">
      {/* 🔥 PAGE HEADER */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">
          Dashboard Overview
        </h1>
        <p className="text-sm text-gray-500">
          Monitor your sales and course performance
        </p>
      </div>

      {/* 🔥 STATS CARDS */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {/* Total Sales */}
        <Card className="rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300">
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Sales</p>
              <h2 className="text-3xl font-bold mt-1">{totalSales}</h2>
            </div>
            <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-xl">
              <ShoppingCart className="text-blue-600" />
            </div>
          </CardContent>
        </Card>

        {/* Total Revenue */}
        <Card className="rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300">
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Revenue</p>
              <h2 className="text-3xl font-bold mt-1">৳{totalRevenue}</h2>
            </div>
            <div className="bg-green-100 dark:bg-green-900 p-3 rounded-xl">
              <DollarSign className="text-green-600" />
            </div>
          </CardContent>
        </Card>

        {/* Extra Insight */}
        <Card className="rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300">
          <CardContent className="p-6">
            <p className="text-sm text-gray-500">Avg Revenue per Sale</p>
            <h2 className="text-3xl font-bold mt-1">
              ৳{totalSales > 0 ? Math.round(totalRevenue / totalSales) : 0}
            </h2>
          </CardContent>
        </Card>
      </div>

      {/* 🔥 CHART SECTION */}
      <Card className="rounded-2xl shadow-sm hover:shadow-md transition-all">
        <CardHeader>
          <CardTitle className="text-lg">Course Performance</CardTitle>
        </CardHeader>

        <CardContent>
          {courseData.length === 0 ? (
            <div className="text-center text-gray-500 py-10">
              No course data available yet
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={courseData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="name"
                  angle={-25}
                  textAnchor="end"
                  interval={0}
                  tick={{ fontSize: 12 }}
                />
                <YAxis />
                <Tooltip formatter={(value) => [`৳${value}`, "Price"]} />
                <Line
                  type="monotone"
                  dataKey="price"
                  strokeWidth={3}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;

// 🔥 SKELETON LOADING
const DashboardSkeleton = () => {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="h-6 w-40 bg-gray-300 rounded" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="h-24 bg-gray-300 rounded-2xl" />
        ))}
      </div>

      <div className="h-72 bg-gray-300 rounded-2xl" />
    </div>
  );
};
