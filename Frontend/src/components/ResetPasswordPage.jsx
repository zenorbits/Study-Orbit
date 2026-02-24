import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toggleMode } from "../redux/features/toggleThemeSlice";
import { useResetPasswordMutation } from "../redux/api/resetpasswordApi";

const ResetPasswordPage = () => {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [resetPasswordMutation, { isLoading }] = useResetPasswordMutation();

    // Redux theme state
    const selector = useSelector((state) => state.toggleTheme.value);
    const dispatch = useDispatch();

    const location = useLocation();
    const navigate = useNavigate();
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get("token");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!token) {
            toast.error("❌ Reset token missing");
            return;
        }

        if (!password.trim() || !confirmPassword.trim()) {
            toast.error("❌ Please fill in both fields");
            return;
        }

        if (password !== confirmPassword) {
            toast.error("❌ Passwords do not match");
            return;
        }

        try {
            const response = await resetPasswordMutation({ token, password }).unwrap();
            toast.success(response.message || "✅ Password reset successful");

            setPassword("");
            setConfirmPassword("");

            // Redirect to login after success
            setTimeout(() => navigate("/login"), 1500);
        } catch (err) {
            toast.error(err?.data?.message || "❌ Something went wrong, please try again");
        }
    };

    // ✅ Sync Redux state with Tailwind's dark mode
    useEffect(() => {
        if (selector === "Dark") {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }, [selector]);

    return (
        <div
            className="relative flex items-center justify-center min-h-screen w-full px-4 
      bg-gradient-to-br from-white via-blue-100 to-blue-500 
      dark:bg-gradient-to-br dark:from-gray-900 dark:via-black dark:to-emerald-900"
        >
            {/* Toggle Button fixed at top-right of the page */}
            <div className="absolute top-4 right-4">
                <button
                    onClick={() => dispatch(toggleMode())}
                    className="px-4 py-2 rounded-md text-sm font-medium 
                     bg-sky-500 text-white hover:bg-sky-600 
                     dark:bg-emerald-500 dark:hover:bg-emerald-600 transition"
                >
                    {selector === "Dark" ? "☀️ Light Mode" : "🌙 Dark Mode"}
                </button>
            </div>

            <div className="backdrop-blur-lg bg-white/70 dark:bg-gradient-to-br from-gray-900 via-black to-emerald-900 
        shadow-2xl rounded-xl p-6 sm:p-8 md:p-10 w-full max-w-sm sm:max-w-md lg:max-w-lg 
        border border-gray-200 dark:border-white/20"
            >
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center 
          text-sky-500 dark:text-emerald-400 mb-6">
                    Reset Password 🔒
                </h2>
                <p className="text-center text-gray-600 dark:text-gray-300 mb-6">
                    Enter your new password below
                </p>

                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                    <div>
                        <label className="block text-gray-700 dark:text-gray-200 font-medium mb-2">
                            New Password
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter new password"
                            className="w-full px-3 py-2 border border-gray-300 dark:border-white/30 rounded-lg 
                bg-white dark:bg-white/10 text-black dark:text-white 
                placeholder-gray-400 dark:placeholder-gray-300 
                focus:outline-none focus:ring-2 focus:ring-sky-400 dark:focus:ring-emerald-400"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 dark:text-gray-200 font-medium mb-2">
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="Confirm new password"
                            className="w-full px-3 py-2 border border-gray-300 dark:border-white/30 rounded-lg 
                bg-white dark:bg-white/10 text-black dark:text-white 
                placeholder-gray-400 dark:placeholder-gray-300 
                focus:outline-none focus:ring-2 focus:ring-sky-400 dark:focus:ring-emerald-400"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-sky-500 dark:bg-emerald-500 text-white font-semibold py-2 sm:py-3 rounded-lg 
              hover:bg-sky-600 dark:hover:bg-emerald-600 transition duration-200 active:scale-95 disabled:opacity-50"
                    >
                        {isLoading ? "Resetting..." : "Reset Password"}
                    </button>
                </form>

                <div className="text-center pt-5">
                    <span className="text-black dark:text-white">Remembered your password?</span>{" "}
                    <Link
                        to="/login"
                        className="text-sky-500 hover:text-sky-800 dark:text-emerald-400 dark:hover:text-emerald-500 font-medium"
                    >
                        Back to Login
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ResetPasswordPage;