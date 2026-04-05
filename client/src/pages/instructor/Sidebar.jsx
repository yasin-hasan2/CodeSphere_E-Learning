import { ChartNoAxesColumn, SquareLibrary } from "lucide-react";
import { Link, Outlet, useLocation } from "react-router-dom";

const Sidebar = () => {
  const { pathname } = useLocation();

  const menu = [
    {
      name: "Dashboard",
      icon: ChartNoAxesColumn,
      path: "/teacher/dashboard",
    },
    {
      name: "Courses",
      icon: SquareLibrary,
      path: "/teacher/courses",
    },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-[#0f0f0f]">
      {/* 🔥 SIDEBAR */}
      <aside className="hidden lg:flex flex-col w-[260px] border-r bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl border-gray-200 dark:border-gray-800 sticky top-0 h-screen">
        {/* LOGO / HEADER */}
        <div className="px-6 py-6 border-b border-gray-200 dark:border-gray-800">
          <h1 className="text-xl font-bold tracking-tight">🎓 LMS Admin</h1>
          <p className="text-xs text-gray-500 mt-1">Manage your platform</p>
        </div>

        {/* MENU */}
        <nav className="flex-1 px-4 py-6 space-y-2">
          {menu.map((item, i) => {
            const isActive = pathname.includes(item.path);
            const Icon = item.icon;

            return (
              <Link
                key={i}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group
                ${
                  isActive
                    ? "bg-blue-600 text-white shadow-md"
                    : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                }`}
              >
                <Icon
                  size={20}
                  className={`transition ${
                    isActive ? "text-white" : "group-hover:text-blue-500"
                  }`}
                />

                <span className="text-sm font-medium">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* FOOTER */}
        <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-800">
          <p className="text-xs text-gray-500">© 2026 Your LMS</p>
        </div>
      </aside>

      {/* 🔥 CONTENT */}
      <main className="flex-1 p-6 md:p-10">
        <Outlet />
      </main>
    </div>
  );
};

export default Sidebar;
