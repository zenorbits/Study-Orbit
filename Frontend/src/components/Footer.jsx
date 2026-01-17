import React from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaInstagram, FaGlobe } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className=" bg-gradient-to-br from-gray-900 via-black to-emerald-900 text-white py-8 mt-12">
      <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-6">
        
        {/* Logo / Title */}
        <div className="text-2xl font-bold tracking-wide">
          StudyOrbit
        </div>

        {/* Navigation Links */}
        <ul className="flex flex-wrap gap-6 text-sm font-medium">
          <li>
            <Link to="/" className="hover:text-emerald-400 transition duration-200">
              Home
            </Link>
          </li>
          <li>
            <Link to="/about" className="hover:text-emerald-400 transition duration-200">
              About
            </Link>
          </li>
          <li>
            <Link to="/contact" className="hover:text-emerald-400 transition duration-200">
              Contact
            </Link>
          </li>
        </ul>

        {/* Social Icons */}
        <div className="flex gap-4 text-lg">
          <a href="https://studyorbit.com" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400 transition duration-200">
            <FaGlobe />
          </a>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400 transition duration-200">
            <FaFacebookF />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400 transition duration-200">
            <FaTwitter />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400 transition duration-200">
            <FaInstagram />
          </a>
        </div>
      </div>

      {/* Bottom Line */}
      <div className="text-center text-xs text-gray-400 mt-6">
        © {new Date().getFullYear()} StudyOrbit. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;