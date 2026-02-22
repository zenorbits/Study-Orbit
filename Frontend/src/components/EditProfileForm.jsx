import React, { useState } from "react";
import { useEditProfileMutation } from "../redux/api/profilesettingApi";
import { toast } from "react-toastify";   // <-- import toast
import "react-toastify/dist/ReactToastify.css";

const EditProfileForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: ""
  });

  const [editProfile, { isError, isLoading }] = useEditProfileMutation();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ Validation: at least one of username/email must be filled, and password is required
    if ((!formData.username && !formData.email) || !formData.password) {
      toast.error("Please provide either username or email, and password is required.");
      return;
    }

    try {
      await editProfile({
        updatedData: {
          username: formData.username || undefined,
          email: formData.email || undefined
        },
        password: formData.password
      }).unwrap();

      toast.success("Profile updated successfully!");
    } catch (err) {
      toast.error("Failed to update profile. Please try again.");
    }
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
            Username (optional)
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Enter your username"
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
            Email (optional)
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
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
            Current Password (required)
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            autoComplete="off"
            placeholder="Enter your current password"
            required
            className="w-full px-4 py-2 border border-purple-400 rounded-md 
                       bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 
                       focus:ring-2 focus:ring-purple-400 focus:outline-none"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className={`w-full bg-indigo-600 text-white font-semibold py-2 px-4 rounded-md 
              hover:bg-indigo-700 transition-colors dark:bg-indigo-500 dark:hover:bg-indigo-600
              ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          {isLoading ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
};

export default EditProfileForm;