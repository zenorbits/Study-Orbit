import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toggleMode } from "../redux/features/toggleThemeSlice";
import { useForgotPasswordMutation } from "../redux/api/resetpasswordApi";

const ForgotPasswordPage = () => {
  const [emailOrphoneNumber, setEmailOrphoneNumber] = useState("");
  const selector = useSelector((state) => state.toggleTheme.value);
  const dispatch = useDispatch();

  const [forgotPasswordMutation, { isLoading }] = useForgotPasswordMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Trim to avoid spaces-only input
    if (!emailOrphoneNumber.trim()) {
      toast.error("❌ Please enter your email or phone number");
      return;
    }

    try {
      // ✅ Await the mutation and unwrap the response
      const response = await forgotPasswordMutation({ email: emailOrphoneNumber }).unwrap();
      toast.success(response.message || "✅ Password reset instructions sent");
      setEmailOrphoneNumber("");
    } catch (err) {
      toast.error(err.data?.message || "❌ Something went wrong, please try again");
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
      className="relative flex flex-col items-center justify-center min-h-screen w-full px-4 
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

      {/* Forgot Password Card */}
      <div className="backdrop-blur-lg bg-white/70 dark:bg-gradient-to-br from-gray-900 via-black to-emerald-900 shadow-2xl rounded-xl p-6 sm:p-8 md:p-10 w-full max-w-sm sm:max-w-md lg:max-w-lg border border-gray-200 dark:border-white/20">

        {/* Title */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-sky-500 dark:text-emerald-400 mb-6">
          Forgot Password 🔑
        </h2>
        <p className="text-center text-gray-600 dark:text-gray-300 mb-6">
          Enter your email or phone number to reset your password
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
          <div>
            <label className="block text-gray-700 dark:text-gray-200 font-medium mb-2">
              Email or Phone Number
            </label>
            <input
              type="text"
              value={emailOrphoneNumber}
              onChange={(e) => setEmailOrphoneNumber(e.target.value)}
              placeholder="Enter your email or phone number"
              required
              className="w-full px-3 py-2 sm:px-4 sm:py-2 border border-gray-300 dark:border-white/30 rounded-lg 
                         bg-white dark:bg-white/10 text-black dark:text-white 
                         placeholder-gray-400 dark:placeholder-gray-300 
                         focus:outline-none focus:ring-2 focus:ring-sky-400 dark:focus:ring-emerald-400"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-sky-500 dark:bg-emerald-500 text-white font-semibold py-2 sm:py-3 rounded-lg 
                       hover:bg-sky-600 dark:hover:bg-emerald-600 transition duration-200 active:scale-95 disabled:opacity-50"
          >
            {isLoading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>

        {/* Back to Login */}
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

export default ForgotPasswordPage;