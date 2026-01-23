import React from "react";
import {
  ClipboardDocumentListIcon,
  CheckCircleIcon,
  MegaphoneIcon,
  AcademicCapIcon,
} from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";

const StudentMainBody = () => {
  const stats = [
    {
      title: "Assignments Due",
      value: 3,
      color: "border-emerald-400",
      icon: <ClipboardDocumentListIcon className="w-6 h-6 text-emerald-400" />,
    },
    {
      title: "Attendance",
      value: "85%",
      color: "border-purple-400",
      icon: <CheckCircleIcon className="w-6 h-6 text-purple-400" />,
    },
    {
      title: "My Batch",
      value: "Batch A1",
      color: "border-yellow-400",
      icon: <ClipboardDocumentListIcon className="w-6 h-6 text-yellow-400" />,
    },
    {
      title: "Upcoming Exams",
      value: "2",
      color: "border-sky-400",
      icon: <AcademicCapIcon className="w-6 h-6 text-sky-400" />,
    },
  ];

  return (
    <div
      className="min-h-[80vh] flex flex-col items-center py-10 
        bg-gradient-to-br from-white via-blue-100 to-blue-500 
        dark:from-gray-900 dark:via-black dark:to-emerald-900"
    >
      {/* Header */}
      <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-8">
        Student Dashboard
      </h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-11/12 md:w-4/5">
        {stats.map((stat, index) => (
          <div
            key={index}
            className={`rounded-lg shadow-md p-6 bg-white/80 dark:bg-gray-800/80 
                text-gray-800 dark:text-gray-100 font-semibold border ${stat.color} 
                hover:shadow-lg transition`}
          >
            <div className="flex items-center gap-3">
              {stat.icon}
              <h2 className="text-lg">{stat.title}</h2>
            </div>
            <p className="text-2xl mt-2">{stat.value}</p>
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
            to="/student/assignments"
            className="flex flex-col items-start gap-2 px-6 py-4 rounded-lg 
              bg-white/80 dark:bg-gray-800/80 text-gray-800 dark:text-gray-100 
              font-semibold shadow-md border border-emerald-400 hover:shadow-emerald-300 
              hover:bg-gray-100 dark:hover:bg-gray-700 transition"
          >
            <div className="flex items-center gap-3">
              <ClipboardDocumentListIcon className="w-5 h-5 text-emerald-400" />
              <span>Assignments</span>
            </div>
            <p className="text-sm opacity-80">Check pending assignments and submit your work</p>
          </Link>

          <Link
            to="/student/attendance"
            className="flex flex-col items-start gap-2 px-6 py-4 rounded-lg 
              bg-white/80 dark:bg-gray-800/80 text-gray-800 dark:text-gray-100 
              font-semibold shadow-md border border-purple-400 hover:shadow-purple-300 
              hover:bg-gray-100 dark:hover:bg-gray-700 transition"
          >
            <div className="flex items-center gap-3">
              <CheckCircleIcon className="w-5 h-5 text-purple-400" />
              <span>Attendance</span>
            </div>
            <p className="text-sm opacity-80">Track your attendance percentage</p>
          </Link>

          <Link
            to="/student/announcements"
            className="flex flex-col items-start gap-2 px-6 py-4 rounded-lg 
              bg-white/80 dark:bg-gray-800/80 text-gray-800 dark:text-gray-100 
              font-semibold shadow-md border border-yellow-400 hover:shadow-yellow-300 
              hover:bg-gray-100 dark:hover:bg-gray-700 transition"
          >
            <div className="flex items-center gap-3">
              <MegaphoneIcon className="w-5 h-5 text-yellow-400" />
              <span>Announcements</span>
            </div>
            <p className="text-sm opacity-80">Stay updated with latest news</p>
          </Link>

          {/* Replaced Profile with Join Batches */}
          <Link
            to="/student/join-batch"
            className="flex flex-col items-start gap-2 px-6 py-4 rounded-lg 
              bg-white/80 dark:bg-gray-800/80 text-gray-800 dark:text-gray-100 
              font-semibold shadow-md border border-indigo-400 hover:shadow-indigo-300 
              hover:bg-gray-100 dark:hover:bg-gray-700 transition"
          >
            <div className="flex items-center gap-3">
              <ClipboardDocumentListIcon className="w-5 h-5 text-indigo-400" />
              <span>Join Batches</span>
            </div>
            <p className="text-sm opacity-80">Browse and join available batches</p>
          </Link>

          <Link
            to="/student/resources"
            className="flex flex-col items-start gap-2 px-6 py-4 rounded-lg 
              bg-white/80 dark:bg-gray-800/80 text-gray-800 dark:text-gray-100 
              font-semibold shadow-md border border-sky-400 hover:shadow-sky-300 
              hover:bg-gray-100 dark:hover:bg-gray-700 transition"
          >
            <div className="flex items-center gap-3">
              <AcademicCapIcon className="w-5 h-5 text-sky-400" />
              <span>Resources</span>
            </div>
            <p className="text-sm opacity-80">Access study materials and helpful resources</p>
          </Link>

          <Link
            to="/student/batches"
            className="flex flex-col items-start gap-2 px-6 py-4 rounded-lg 
              bg-white/80 dark:bg-gray-800/80 text-gray-800 dark:text-gray-100 
              font-semibold shadow-md border border-red-400 hover:shadow-red-300 
              hover:bg-gray-100 dark:hover:bg-gray-700 transition"
          >
            <div className="flex items-center gap-3">
              <ClipboardDocumentListIcon className="w-5 h-5 text-red-400" />
              <span>Batches</span>
            </div>
            <p className="text-sm opacity-80">View your batch details and schedules</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default StudentMainBody;