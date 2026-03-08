import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  AcademicCapIcon,
  ClipboardDocumentListIcon,
  MegaphoneIcon,
  UserCircleIcon,
} from "@heroicons/react/24/solid";

const TeacherMainBody = () => {
  const theme = useSelector((state) => state.toggleTheme.value);

  useEffect(() => {
    if (theme === "Dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  return (
    <div
      className="min-h-[80vh] flex flex-col items-center py-12 
      bg-gradient-to-br from-white via-blue-100 to-blue-500 
      dark:from-gray-900 dark:via-black dark:to-emerald-900"
    >
      {/* Header */}
      <h1 className="text-4xl font-extrabold text-gray-800 dark:text-gray-100 mb-12 tracking-wide">
        Teacher Dashboard
      </h1>

      {/* Quick Actions */}
      <div className="w-11/12 md:w-4/5">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-8">
          🚀 Quick Actions
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {/* Manage Batches */}
          <Link
            to="/teacher/batch"
            className="flex flex-col gap-3 px-6 py-6 rounded-xl 
              bg-white/20 dark:bg-gray-800/30 backdrop-blur-md 
              text-gray-800 dark:text-gray-100 font-semibold shadow-lg 
              border border-sky-400 hover:shadow-sky-400/50 hover:scale-105 
              transition-transform duration-300 ease-in-out"
          >
            <div className="flex items-center gap-3">
              <ClipboardDocumentListIcon className="w-7 h-7 text-sky-400" />
              <span className="text-lg">Manage Batches</span>
            </div>
            <p className="text-sm opacity-80">Manage batch details and students</p>
          </Link>

          {/* Batches */}
          <Link
            to="/teacher/managebatch"
            className="flex flex-col gap-3 px-6 py-6 rounded-xl 
              bg-white/20 dark:bg-gray-800/30 backdrop-blur-md 
              text-gray-800 dark:text-gray-100 font-semibold shadow-lg 
              border border-emerald-400 hover:shadow-emerald-400/50 hover:scale-105 
              transition-transform duration-300 ease-in-out"
          >
            <div className="flex items-center gap-3">
              <AcademicCapIcon className="w-7 h-7 text-emerald-400" />
              <span className="text-lg">Batches</span>
            </div>
            <p className="text-sm opacity-80">Add, edit, or delete batches</p>
          </Link>

          {/* Assignments */}
          <Link
            to="/teacher/assignments"
            className="flex flex-col gap-3 px-6 py-6 rounded-xl 
              bg-white/20 dark:bg-gray-800/30 backdrop-blur-md 
              text-gray-800 dark:text-gray-100 font-semibold shadow-lg 
              border border-purple-400 hover:shadow-purple-400/50 hover:scale-105 
              transition-transform duration-300 ease-in-out"
          >
            <div className="flex items-center gap-3">
              <ClipboardDocumentListIcon className="w-7 h-7 text-purple-400" />
              <span className="text-lg">Assignments</span>
            </div>
            <p className="text-sm opacity-80">Create and review assignments</p>
          </Link>

          {/* Announcements */}
          <Link
            to="/teacher/announcements"
            className="flex flex-col gap-3 px-6 py-6 rounded-xl 
              bg-white/20 dark:bg-gray-800/30 backdrop-blur-md 
              text-gray-800 dark:text-gray-100 font-semibold shadow-lg 
              border border-yellow-400 hover:shadow-yellow-400/50 hover:scale-105 
              transition-transform duration-300 ease-in-out"
          >
            <div className="flex items-center gap-3">
              <MegaphoneIcon className="w-7 h-7 text-yellow-400" />
              <span className="text-lg">Announcements</span>
            </div>
            <p className="text-sm opacity-80">Post important updates for students</p>
          </Link>

          {/* Profile */}
          <Link
            to="/teacher/profile"
            className="flex flex-col gap-3 px-6 py-6 rounded-xl 
              bg-white/20 dark:bg-gray-800/30 backdrop-blur-md 
              text-gray-800 dark:text-gray-100 font-semibold shadow-lg 
              border border-indigo-400 hover:shadow-indigo-400/50 hover:scale-105 
              transition-transform duration-300 ease-in-out"
          >
            <div className="flex items-center gap-3">
              <UserCircleIcon className="w-7 h-7 text-indigo-400" />
              <span className="text-lg">My Profile</span>
            </div>
            <p className="text-sm opacity-80">View and edit your profile</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TeacherMainBody;