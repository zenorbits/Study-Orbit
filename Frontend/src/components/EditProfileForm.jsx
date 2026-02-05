import React, { useState } from "react";

const EditProfileForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Updated Profile:", formData);
  };

  return (
    <div
      className="min-h-[80vh] flex items-center justify-center 
                 bg-gradient-to-br from-white via-blue-100 to-blue-500 
                 dark:from-gray-900 dark:via-black dark:to-emerald-900"
    >
      <form
        onSubmit={handleSubmit}
        className="bg-white/80 dark:bg-gray-800/80 shadow-lg rounded-lg p-8 w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-gray-100 mb-6">
          ✏️ Edit Profile
        </h2>

        {/* Username */}
        <div className="mb-4">
          <label
            htmlFor="username"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Enter your username"
            required
            className="w-full px-4 py-2 border border-sky-400 rounded-md 
                       bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 
                       focus:ring-2 focus:ring-sky-400 focus:outline-none"
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
            className="w-full px-4 py-2 border border-emerald-400 rounded-md 
                       bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 
                       focus:ring-2 focus:ring-emerald-400 focus:outline-none"
          />
        </div>

        {/* Password */}
        <div className="mb-6">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter new password"
            required
            className="w-full px-4 py-2 border border-purple-400 rounded-md 
                       bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 
                       focus:ring-2 focus:ring-purple-400 focus:outline-none"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white font-semibold py-2 px-4 rounded-md 
                     hover:bg-indigo-700 transition-colors dark:bg-indigo-500 dark:hover:bg-indigo-600"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditProfileForm;