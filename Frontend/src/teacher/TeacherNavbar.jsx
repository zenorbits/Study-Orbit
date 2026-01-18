import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toggleMode } from "../redux/features/toggleThemeSlice";
import { useDispatch, useSelector } from "react-redux";
import { useUserLogoutMutation } from "../redux/api/authApi";
import { logout } from "../redux/features/authApiSlice";

const TeacherNavbar = () => {
  const selector = useSelector((state) => state.toggleTheme.value);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [logoutMutation] = useUserLogoutMutation();

  useEffect(() => {
    if (selector === "Dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [selector]);

  const handleLogout = async () => {
    try {
      await logoutMutation().unwrap();
      dispatch(logout());
      localStorage.removeItem("user");
      console.log("Logged out");
      navigate("/login");
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  return (
    <nav
      className={`w-full h-20 flex items-center justify-between px-6 md:px-12 
      shadow-lg relative border-b 
      ${selector === "Dark"
        ? "text-white bg-black/40 backdrop-blur-md border-emerald-500"
        : "text-sky-900 bg-gradient-to-r from-sky-200 via-sky-300 to-sky-400 border-sky-300"}`}
    >
      {/* Logo */}
      <Link to="/teacher">
        <div
          className={`font-bold text-2xl tracking-wide ${
            selector === "Dark" ? "text-emerald-400" : "text-sky-900"
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

      {/* Links + Profile + Toggle + Logout */}
      <div
        className={`flex-col md:flex md:flex-row md:items-center md:gap-12 absolute md:static 
          top-20 left-0 w-full md:w-auto transition-all duration-500 ease-in-out z-50 
          ${isOpen ? "flex" : "hidden"} 
          ${selector === "Dark"
            ? "bg-black/90 backdrop-blur-md shadow-lg"
            : "bg-transparent"} `}
      >
        {/* Profile */}
        <Link to="/profile">
          <div className="flex items-center gap-3 px-6 md:px-0 py-4 md:py-0 hover:opacity-90 transition">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwMPjHEmoDlOtA_YduTR5talb_zihtvdEgrA&s"
              alt="Profile"
              className={`w-10 h-10 rounded-full border-2 shadow-md ${
                selector === "Dark" ? "border-emerald-400" : "border-sky-500"
              }`}
            />
            <span
              className={`font-semibold ${
                selector === "Dark" ? "text-emerald-400" : "text-sky-900"
              }`}
            >
              Henry Cavill
            </span>
          </div>
        </Link>

        {/* Dark/Light Toggle */}
        <button
          onClick={() => dispatch(toggleMode())}
          className={`mt-4 md:mt-0 px-5 py-2 rounded-full font-semibold shadow-md hover:scale-105 hover:shadow-lg transition 
            ${selector === "Dark" ? "bg-emerald-500 text-white" : "bg-sky-500 text-white"}`}
        >
          {selector === "Dark" ? "Light Mode ☀️" : "Dark Mode 🌙"}
        </button>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className={`mt-4 md:mt-0 px-5 py-2 rounded-full font-semibold shadow-md hover:scale-105 hover:shadow-lg transition 
            ${selector === "Dark" ? "bg-red-500 text-white" : "bg-red-600 text-white"}`}
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default TeacherNavbar;