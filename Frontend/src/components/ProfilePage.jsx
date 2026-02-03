import React, { useEffect } from "react";
import { useFetchProfileInfoQuery } from "../redux/api/userApi";
import {
  EnvelopeIcon,
  PhoneIcon,
  IdentificationIcon,
  UserCircleIcon,
} from "@heroicons/react/24/solid";
import { useDeleteProfileMutation } from "../redux/api/profilesettingApi";
import { useNavigate } from "react-router-dom";
import { useUserLogoutMutation } from "../redux/api/authApi";
import { useDispatch } from "react-redux";
import { logout } from "../redux/features/authApiSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProfilePage = () => {
  const { data, isLoading, isError, refetch } = useFetchProfileInfoQuery();
  const profileInfo = data?.user;

  const [logoutUser] = useUserLogoutMutation();
  const [deleteProfile] = useDeleteProfileMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Auto-refetch every 60 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      refetch();
    }, 60000);
    return () => clearInterval(interval);
  }, [refetch]);

  const handleLogout = async () => {
    try {
      await logoutUser().unwrap();
      dispatch(logout());
      localStorage.removeItem("user");
      toast.success("Logged out successfully");
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (err) {
      console.error("Logout failed", err);
      toast.error("Logout failed");
    }
  };

  const handleDeleteProfile = async () => {
    if (window.confirm("Are you sure you want to delete your profile?")) {
      try {
        await deleteProfile().unwrap();
        dispatch(logout());
        localStorage.removeItem("user");
        toast.success("Profile deleted successfully");
        setTimeout(() => {
          navigate("/login"); // redirect to login after deletion
        }, 1500);
      } catch (error) {
        console.error("Delete failed", error);
        toast.error(error?.data?.message || "Error deleting profile");
      }
    }
  };

  const infoBlocks = [
    {
      label: "Email",
      value: profileInfo?.email,
      icon: <EnvelopeIcon className="w-6 h-6 text-sky-400" />,
      border: "border-sky-400",
    },
    {
      label: "Phone",
      value: profileInfo?.phoneNumber,
      icon: <PhoneIcon className="w-6 h-6 text-emerald-400" />,
      border: "border-emerald-400",
    },
    {
      label: "User ID",
      value: profileInfo?._id,
      icon: <IdentificationIcon className="w-6 h-6 text-purple-400" />,
      border: "border-purple-400",
    },
    {
      label: "Role",
      value: profileInfo?.role?.toUpperCase(),
      icon: <UserCircleIcon className="w-6 h-6 text-yellow-400" />,
      border: "border-yellow-400",
    },
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">
          Loading profile...
        </p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg font-semibold text-red-600">
          Failed to load profile info.
        </p>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen py-10 px-6 
      bg-gradient-to-br from-white via-blue-100 to-blue-500 
      dark:from-gray-900 dark:via-black dark:to-emerald-900"
    >
      {/* Toast Container */}


      {/* Profile Header */}
      <div className="flex flex-col items-center mb-12">
        <div className="w-28 h-28 rounded-full bg-sky-600 dark:bg-emerald-600 flex items-center justify-center text-white text-4xl font-bold shadow">
          {profileInfo?.username?.charAt(0).toUpperCase()}
        </div>
        <h2 className="mt-4 text-3xl font-bold text-gray-800 dark:text-gray-100">
          {profileInfo?.username}
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          {profileInfo?.role?.toUpperCase()}
        </p>
      </div>

      {/* Info Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12 w-11/12 md:w-4/5 mx-auto">
        {infoBlocks.map((block, index) => (
          <div
            key={index}
            className={`rounded-lg shadow-md p-6 bg-white/80 dark:bg-gray-800/80 
              text-gray-800 dark:text-gray-100 font-semibold border ${block.border} 
              hover:shadow-lg transition`}
          >
            <div className="flex items-center gap-3">
              {block.icon}
              <h2 className="text-lg">{block.label}</h2>
            </div>
            <p className="text-xl mt-2">{block.value}</p>
          </div>
        ))}
      </div>

      {/* Options */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-11/12 md:w-4/5 mx-auto">
        <button className="py-3 rounded-lg bg-white/80 dark:bg-gray-800/80 text-gray-800 dark:text-gray-100 font-semibold shadow-md border border-sky-400 hover:shadow-sky-300 transition">
          ✏️ Edit Profile
        </button>
        <button className="py-3 rounded-lg bg-white/80 dark:bg-gray-800/80 text-gray-800 dark:text-gray-100 font-semibold shadow-md border border-yellow-400 hover:shadow-yellow-300 transition">
          🔒 Change Password
        </button>
        <button
          onClick={handleLogout}
          className="py-3 rounded-lg bg-white/80 dark:bg-gray-800/80 text-gray-800 dark:text-gray-100 font-semibold shadow-md border border-red-400 hover:shadow-red-300 transition"
        >
          🚪 Logout
        </button>
        <button
          onClick={handleDeleteProfile}
          className="py-3 rounded-lg bg-white/80 dark:bg-gray-800/80 text-gray-800 dark:text-gray-100 font-semibold shadow-md border border-indigo-400 hover:shadow-indigo-300 transition"
        >
          ❌ Delete Account
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;