import React from "react";
import {
  ClipboardDocumentListIcon,
  MegaphoneIcon,
} from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";

const StudentMainBody = () => {
  return (
    <div
      className="min-h-[80vh] flex flex-col items-center py-12 
        bg-gradient-to-br from-white via-blue-100 to-blue-500 
        dark:from-gray-900 dark:via-black dark:to-emerald-900"
    >
      {/* Header */}
      <h1 className="text-4xl font-extrabold text-gray-800 dark:text-gray-100 mb-12 tracking-wide">
        Student Dashboard
      </h1>

      {/* Quick Actions */}
      <div className="w-11/12 md:w-4/5">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-8">
          🚀 Quick Actions
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {/* Announcements */}
          <Link
            to="/student/announcements"
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
            <p className="text-sm opacity-80">Stay updated with latest news</p>
          </Link>

          {/* Join Batches */}
          <Link
            to="/student/join-batch"
            className="flex flex-col gap-3 px-6 py-6 rounded-xl 
              bg-white/20 dark:bg-gray-800/30 backdrop-blur-md 
              text-gray-800 dark:text-gray-100 font-semibold shadow-lg 
              border border-indigo-400 hover:shadow-indigo-400/50 hover:scale-105 
              transition-transform duration-300 ease-in-out"
          >
            <div className="flex items-center gap-3">
              <ClipboardDocumentListIcon className="w-7 h-7 text-indigo-400" />
              <span className="text-lg">Join Batches</span>
            </div>
            <p className="text-sm opacity-80">Browse and join available batches</p>
          </Link>

          {/* My Batches */}
          <Link
            to="/student/batches"
            className="flex flex-col gap-3 px-6 py-6 rounded-xl 
              bg-white/20 dark:bg-gray-800/30 backdrop-blur-md 
              text-gray-800 dark:text-gray-100 font-semibold shadow-lg 
              border border-red-400 hover:shadow-red-400/50 hover:scale-105 
              transition-transform duration-300 ease-in-out"
          >
            <div className="flex items-center gap-3">
              <ClipboardDocumentListIcon className="w-7 h-7 text-red-400" />
              <span className="text-lg">My Batches</span>
            </div>
            <p className="text-sm opacity-80">View your batch details and schedules</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default StudentMainBody;