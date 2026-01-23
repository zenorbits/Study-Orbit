import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  AcademicCapIcon,
  ClipboardDocumentListIcon,
  MegaphoneIcon,
  UserCircleIcon,
  BookOpenIcon,
} from "@heroicons/react/24/solid";

const TeacherMainBody = () => {
  const theme = useSelector((state) => state.toggleTheme.value);

  const stats = [
    { title: "My Batches", value: 5, icon: <ClipboardDocumentListIcon className="w-6 h-6 text-sky-400" /> },
    { title: "Assignments Created", value: 12, icon: <AcademicCapIcon className="w-6 h-6 text-emerald-400" /> },
    { title: "Announcements Posted", value: 4, icon: <MegaphoneIcon className="w-6 h-6 text-purple-400" /> },
    { title: "Manage Batches", icon: <ClipboardDocumentListIcon className="w-6 h-6 text-yellow-400" /> },
  ];

  useEffect(() => {
    if (theme === "Dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  return (
    <div
      className="min-h-[80vh] flex flex-col items-center py-10 
      bg-gradient-to-br from-white via-blue-100 to-blue-500 
      dark:from-gray-900 dark:via-black dark:to-emerald-900"
    >
      {/* Header */}
      <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-8">
        Teacher Dashboard
      </h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-11/12 md:w-4/5">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="rounded-lg shadow-md p-6 
              bg-white/80 dark:bg-gray-800/80 
              text-gray-800 dark:text-gray-100 
              font-semibold border hover:shadow-lg transition"
          >
            <div className="flex items-center gap-3">
              {stat.icon}
              <h2 className="text-lg">{stat.title}</h2>
            </div>
            {stat.value && <p className="text-2xl mt-2">{stat.value}</p>}
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="mt-12 w-11/12 md:w-4/5">
        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link
            to="/teacher/batch"
            className="flex flex-col items-start gap-2 px-6 py-4 rounded-lg 
              bg-white/80 dark:bg-gray-800/80 text-gray-800 dark:text-gray-100 
              font-semibold shadow-md border border-sky-400 hover:shadow-sky-300 
              hover:bg-gray-100 dark:hover:bg-gray-700 transition"
          >
            <div className="flex items-center gap-3">
              <ClipboardDocumentListIcon className="w-5 h-5 text-sky-400" />
              <span>Manage Batches</span>
            </div>
            <p className="text-sm opacity-80">Manage batch details and students</p>
          </Link>

          <Link
            to="/teacher/managebatch"
            className="flex flex-col items-start gap-2 px-6 py-4 rounded-lg 
              bg-white/80 dark:bg-gray-800/80 text-gray-800 dark:text-gray-100 
              font-semibold shadow-md border border-emerald-400 hover:shadow-emerald-300 
              hover:bg-gray-100 dark:hover:bg-gray-700 transition"
          >
            <div className="flex items-center gap-3">
              <AcademicCapIcon className="w-5 h-5 text-emerald-400" />
              <span>Batches</span>
            </div>
            <p className="text-sm opacity-80">Add, edit, or delete batches</p>
          </Link>

          <Link
            to="/teacher/assignments"
            className="flex flex-col items-start gap-2 px-6 py-4 rounded-lg 
              bg-white/80 dark:bg-gray-800/80 text-gray-800 dark:text-gray-100 
              font-semibold shadow-md border border-purple-400 hover:shadow-purple-300 
              hover:bg-gray-100 dark:hover:bg-gray-700 transition"
          >
            <div className="flex items-center gap-3">
              <ClipboardDocumentListIcon className="w-5 h-5 text-purple-400" />
              <span>Assignments</span>
            </div>
            <p className="text-sm opacity-80">Create and review assignments</p>
          </Link>

          <Link
            to="/teacher/announcements"
            className="flex flex-col items-start gap-2 px-6 py-4 rounded-lg 
              bg-white/80 dark:bg-gray-800/80 text-gray-800 dark:text-gray-100 
              font-semibold shadow-md border border-yellow-400 hover:shadow-yellow-300 
              hover:bg-gray-100 dark:hover:bg-gray-700 transition"
          >
            <div className="flex items-center gap-3">
              <MegaphoneIcon className="w-5 h-5 text-yellow-400" />
              <span>Announcements</span>
            </div>
            <p className="text-sm opacity-80">Post important updates for students</p>
          </Link>

          {/* Profile */}
          <Link
            to="/teacher/profile"
            className="flex flex-col items-start gap-2 px-6 py-4 rounded-lg 
              bg-white/80 dark:bg-gray-800/80 text-gray-800 dark:text-gray-100 
              font-semibold shadow-md border border-indigo-400 hover:shadow-indigo-300 
              hover:bg-gray-100 dark:hover:bg-gray-700 transition"
          >
            <div className="flex items-center gap-3">
              <UserCircleIcon className="w-5 h-5 text-indigo-400" />
              <span>My Profile</span>
            </div>
            <p className="text-sm opacity-80">View and edit your profile</p>
          </Link>

          {/* Extra Button: Resources */}
          <Link
            to="/teacher/resources"
            className="flex flex-col items-start gap-2 px-6 py-4 rounded-lg 
              bg-white/80 dark:bg-gray-800/80 text-gray-800 dark:text-gray-100 
              font-semibold shadow-md border border-pink-400 hover:shadow-pink-300 
              hover:bg-gray-100 dark:hover:bg-gray-700 transition"
          >
            <div className="flex items-center gap-3">
              <BookOpenIcon className="w-5 h-5 text-pink-400" />
              <span>Resources</span>
            </div>
            <p className="text-sm opacity-80">Access study materials and notes</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TeacherMainBody;