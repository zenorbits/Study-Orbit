import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
    return (
        <div className="w-screen h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-emerald-900 text-white">
            <div className="flex flex-col items-center gap-10 text-center">

                {/* Title Section */}
                <div className="space-y-4">
                    <h1 className="text-6xl md:text-7xl font-extrabold text-emerald-400 drop-shadow-lg">
                        StudyOrbit
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-300 italic">
                        Enlightening way to success...
                    </p>
                </div>

                {/* Buttons */}
                <div className="flex gap-6">
                    <Link
                        to="/register"
                        className="px-6 py-3 rounded-xl bg-emerald-400 text-black font-semibold shadow-md hover:bg-emerald-500 hover:scale-105 transition-transform duration-200"
                    >
                        Register
                    </Link>
                    <Link
                        to="/login"
                        className="px-6 py-3 rounded-xl bg-emerald-400 text-black font-semibold shadow-md hover:bg-emerald-500 hover:scale-105 transition-transform duration-200"
                    >
                        Login
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default LandingPage;