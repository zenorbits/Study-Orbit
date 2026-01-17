import React, { useState } from "react";
import { Link } from "react-router-dom";

const TeacherNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="w-full h-20 shadow-lg flex items-center justify-between px-6 md:px-12  text-white">
      {/* Logo / Title */}
      <div className="title font-bold text-2xl tracking-wide">
        StudyOrbit
      </div>

      {/* Hamburger Menu (Mobile) */}
      <div className="md:hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-white focus:outline-none"
        >
          {/* Icon */}
          {isOpen ? (
            <span className="text-2xl">&times;</span> // Close icon
          ) : (
            <span className="text-2xl">&#9776;</span> // Hamburger icon
          )}
        </button>
      </div>

      {/* Links + Profile */}
      <div
        className={`flex-col md:flex md:flex-row md:items-center md:gap-12 absolute md:static top-20 left-0 w-full md:w-auto bg-gray-900 md:bg-transparent transition-all duration-300 ease-in-out ${
          isOpen ? "flex" : "hidden"
        }`}
      >
        {/* Navigation Links */}
        <ul className="flex flex-col md:flex-row gap-6 md:gap-8 font-medium px-6 md:px-0 py-4 md:py-0">
          <li>
            <Link
              to="/"
              className="hover:text-emerald-400 transition duration-200"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/assignments"
              className="hover:text-emerald-400 transition duration-200"
              onClick={() => setIsOpen(false)}
            >
              Assignments
            </Link>
          </li>
          <li>
            <Link
              to="/announcements"
              className="hover:text-emerald-400 transition duration-200"
              onClick={() => setIsOpen(false)}
            >
              Announcements
            </Link>
          </li>
        </ul>

        {/* Profile Button */}
        <div className="px-6 md:px-0 pb-4 md:pb-0">
          <button className="bg-emerald-400 px-4 py-2 rounded-xl font-bold text-black hover:bg-emerald-500 transition duration-200 shadow-md w-full md:w-auto">
            Profile
          </button>
        </div>
      </div>
    </nav>
  );
};

export default TeacherNavbar;