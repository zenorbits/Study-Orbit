import React from "react";

const ProfilePage = () => {
  // Hardcoded user data for now
  const user = {
    _id: "1234567890",
    username: "Sanchit Pathak",
    email: "sanchit@example.com",
    phone: "+91 9876543210",
    role: "Student",
  };

  return (
    <div className="min-h-screen py-10 px-6 bg-gradient-to-br from-white via-blue-100 to-blue-500 dark:from-gray-900 dark:via-black dark:to-emerald-900">
      {/* Profile Header */}
      <div className="flex flex-col items-center mb-12">
        <div className="w-28 h-28 rounded-full bg-sky-600 dark:bg-emerald-600 flex items-center justify-center text-white text-4xl font-bold shadow-lg">
          {user.username.charAt(0).toUpperCase()}
        </div>
        <h2 className="mt-4 text-3xl font-extrabold text-sky-900 dark:text-emerald-200">
          {user.username}
        </h2>
        <p className="text-lg text-gray-700 dark:text-gray-400">{user.role}</p>
      </div>

      {/* Info Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        {/* Email */}
        <div className="p-6 rounded-xl bg-gradient-to-r from-sky-100 to-sky-200 dark:from-gray-700 dark:to-gray-800 shadow-lg active:scale-95 transition-transform cursor-pointer">
          <div className="flex items-center space-x-3">
            <span className="text-2xl">📧</span>
            <div>
              <p className="text-sm font-semibold text-gray-600 dark:text-gray-300">Email</p>
              <p className="text-base font-bold text-gray-900 dark:text-gray-100">{user.email}</p>
            </div>
          </div>
        </div>

        {/* Phone */}
        <div className="p-6 rounded-xl bg-gradient-to-r from-green-100 to-green-200 dark:from-gray-700 dark:to-gray-800 shadow-lg active:scale-95 transition-transform cursor-pointer">
          <div className="flex items-center space-x-3">
            <span className="text-2xl">📱</span>
            <div>
              <p className="text-sm font-semibold text-gray-600 dark:text-gray-300">Phone</p>
              <p className="text-base font-bold text-gray-900 dark:text-gray-100">{user.phone}</p>
            </div>
          </div>
        </div>

        {/* User ID */}
        <div className="p-6 rounded-xl bg-gradient-to-r from-purple-100 to-purple-200 dark:from-gray-700 dark:to-gray-800 shadow-lg active:scale-95 transition-transform cursor-pointer">
          <div className="flex items-center space-x-3">
            <span className="text-2xl">🆔</span>
            <div>
              <p className="text-sm font-semibold text-gray-600 dark:text-gray-300">User ID</p>
              <p className="text-base font-bold text-gray-900 dark:text-gray-100">{user._id}</p>
            </div>
          </div>
        </div>

        {/* Role */}
        <div className="p-6 rounded-xl bg-gradient-to-r from-yellow-100 to-yellow-200 dark:from-gray-700 dark:to-gray-800 shadow-lg active:scale-95 transition-transform cursor-pointer">
          <div className="flex items-center space-x-3">
            <span className="text-2xl">🎓</span>
            <div>
              <p className="text-sm font-semibold text-gray-600 dark:text-gray-300">Role</p>
              <p className="text-base font-bold text-gray-900 dark:text-gray-100">{user.role}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Options */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <button className="py-3 rounded-lg bg-sky-600 text-white font-semibold active:scale-95 transition shadow">
          ✏️ Edit Profile
        </button>
        <button className="py-3 rounded-lg bg-yellow-500 text-white font-semibold active:scale-95 transition shadow">
          🔒 Change Password
        </button>
        <button className="py-3 rounded-lg bg-red-600 text-white font-semibold active:scale-95 transition shadow">
          🚪 Logout
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;