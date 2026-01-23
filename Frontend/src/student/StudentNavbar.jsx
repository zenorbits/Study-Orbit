import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toggleMode } from "../redux/features/toggleThemeSlice";
import { useDispatch, useSelector } from "react-redux";
import { useUserLogoutMutation } from "../redux/api/authApi";
import { logout } from "../redux/features/authApiSlice";

const StudentNavbar = () => {
  const theme = useSelector((state) => state.toggleTheme.value);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [logoutMutation] = useUserLogoutMutation();

  useEffect(() => {
    if (theme === "Dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const handleLogout = async () => {
    try {
      await logoutMutation().unwrap();
      dispatch(logout());
      localStorage.removeItem("user");
      navigate("/login");
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  return (
    <nav
      className={`w-full flex flex-col md:flex-row md:items-center md:justify-between px-6 md:px-12 
      shadow-lg border-b 
      ${theme === "Dark"
          ? "text-white bg-black/40 backdrop-blur-md border-emerald-500"
          : "text-sky-900 bg-gradient-to-r from-sky-200 via-sky-300 to-sky-400 border-sky-300"}`}
    >
      {/* Top Row: Logo + Hamburger */}
      <div className="flex items-center justify-between h-20">
        {/* Logo */}
        <Link to="/student">
          <div
            className={`font-bold text-2xl tracking-wide ${
              theme === "Dark" ? "text-emerald-400" : "text-sky-900"
            }`}
          >
            StudyOrbit
          </div>
        </Link>

        {/* Hamburger Menu (Mobile) */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-expanded={isOpen}
            aria-label="Toggle Menu"
            className="flex flex-col justify-center items-center w-8 h-8 focus:outline-none group"
          >
            <span
              className={`h-1 w-8 bg-current rounded transition-transform duration-300 ${
                isOpen ? "rotate-45 translate-y-2" : ""
              }`}
            />
            <span
              className={`h-1 w-8 bg-current rounded my-1 transition-opacity duration-300 ${
                isOpen ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`h-1 w-8 bg-current rounded transition-transform duration-300 ${
                isOpen ? "-rotate-45 -translate-y-2" : ""
              }`}
            />
          </button>
        </div>
      </div>

      {/* Links + Profile + Toggle + Logout */}
      <div
        className={`flex-col md:flex md:flex-row md:items-center md:gap-12 w-full md:w-auto 
        transition-all duration-500 ease-in-out
        ${isOpen ? "flex" : "hidden"} 
        md:bg-transparent`}
      >
        {/* Navigation Links */}
        <Link
          to="/student"
          className="px-6 py-3 md:px-0 md:py-0 font-semibold hover:opacity-80 transition"
        >
          Home
        </Link>
        <Link
          to="/student/courses"
          className="px-6 py-3 md:px-0 md:py-0 font-semibold hover:opacity-80 transition"
        >
          Courses
        </Link>
        <Link
          to="/student/batch"
          className="px-6 py-3 md:px-0 md:py-0 font-semibold hover:opacity-80 transition"
        >
          My Batch
        </Link>
        <Link
          to="/student/assignments"
          className="px-6 py-3 md:px-0 md:py-0 font-semibold hover:opacity-80 transition"
        >
          Assignments
        </Link>

        {/* Profile */}
        <Link to="/student/profile">
          <div className="flex items-center gap-3 px-6 md:px-0 py-4 md:py-0 hover:opacity-90 transition">
            <img
              src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
              alt="Student Profile"
              className={`w-10 h-10 rounded-full border-2 shadow-md ${
                theme === "Dark" ? "border-emerald-400" : "border-sky-500"
              }`}
            />
            <span
              className={`font-semibold ${
                theme === "Dark" ? "text-emerald-400" : "text-sky-900"
              }`}
            >
              Student User
            </span>
          </div>
        </Link>

        {/* Dark/Light Toggle */}
        <button
          onClick={() => dispatch(toggleMode())}
          className={`mt-4 md:mt-0 px-5 py-2 rounded-full font-semibold shadow-md hover:scale-105 hover:shadow-lg transition 
          ${theme === "Dark" ? "bg-emerald-500 text-white" : "bg-sky-500 text-white"}`}
        >
          {theme === "Dark" ? "Light Mode ☀️" : "Dark Mode 🌙"}
        </button>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className={`mt-4 md:mt-0 px-5 py-2 rounded-full font-semibold shadow-md hover:scale-105 hover:shadow-lg transition 
          ${theme === "Dark" ? "bg-red-500 text-white" : "bg-red-600 text-white"}`}
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default StudentNavbar;