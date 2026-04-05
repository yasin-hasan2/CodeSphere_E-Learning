import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { AlertTriangle, Home, RefreshCcw } from "lucide-react";

const ErrorPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-gray-50 to-gray-200 dark:from-gray-950 dark:to-gray-900">
      <div className="max-w-lg w-full text-center space-y-6">
        {/* 🔥 ICON */}
        <div className="flex justify-center">
          <div className="p-6 rounded-full bg-red-100 dark:bg-red-900/30 animate-pulse">
            <AlertTriangle size={40} className="text-red-500" />
          </div>
        </div>

        {/* 🔥 TEXT */}
        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tight">
            Something went wrong
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            We couldn’t find the page you’re looking for or something broke.
          </p>
        </div>

        {/* 🔥 ACTIONS */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
          <Link to="/">
            <Button className="w-full sm:w-auto flex items-center gap-2">
              <Home size={16} />
              Go Home
            </Button>
          </Link>

          <Button
            variant="outline"
            onClick={() => window.location.reload()}
            className="w-full sm:w-auto flex items-center gap-2"
          >
            <RefreshCcw size={16} />
            Reload
          </Button>
        </div>

        {/* 🔥 ERROR CODE */}
        <p className="text-xs text-gray-400 pt-6">Error code: 404</p>
      </div>
    </div>
  );
};

export default ErrorPage;
