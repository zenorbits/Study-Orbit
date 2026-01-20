import React from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaInstagram, FaGlobe } from "react-icons/fa";
import { useSelector } from "react-redux";

const Footer = () => {
  const selector = useSelector((state) => state.toggleTheme.value);

  return (
    <footer
      className={` w-full py-10 shadow-lg border-t 
        text-sky-900 dark:text-white 
        ${selector === "Dark" 
          ? "bg-black/40 backdrop-blur-md border-emerald-500" 
          : "bg-gradient-to-r from-sky-200 via-sky-300 to-sky-400 border-sky-300"}`}
    >
      <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-8">
        
        {/* Logo / Title */}
        <div className="text-2xl font-bold tracking-wide text-sky-900 dark:text-emerald-400">
          StudyOrbit
        </div>

        {/* Navigation Links */}
        <ul className="flex flex-wrap gap-6 text-sm font-medium">
          <li>
            <Link
              to="/"
              className="hover:text-sky-700 dark:hover:text-emerald-400 transition duration-200"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              className="hover:text-sky-700 dark:hover:text-emerald-400 transition duration-200"
            >
              About
            </Link>
          </li>
          <li>
            <Link
              to="/contact"
              className="hover:text-sky-700 dark:hover:text-emerald-400 transition duration-200"
            >
              Contact
            </Link>
          </li>
        </ul>

        {/* Social Icons */}
        <div className="flex gap-5 text-lg">
          <a
            href="https://studyorbit.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-sky-700 dark:hover:text-emerald-400 transition duration-200"
          >
            <FaGlobe />
          </a>
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-sky-700 dark:hover:text-emerald-400 transition duration-200"
          >
            <FaFacebookF />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-sky-700 dark:hover:text-emerald-400 transition duration-200"
          >
            <FaTwitter />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-sky-700 dark:hover:text-emerald-400 transition duration-200"
          >
            <FaInstagram />
          </a>
        </div>
      </div>

      {/* Bottom Line */}
      <div className="text-center text-xs text-gray-600 dark:text-gray-400 mt-8">
        © {new Date().getFullYear()} StudyOrbit. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;