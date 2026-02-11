import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const OTPPage = () => {
  const [otp, setOtp] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;

    // ✅ Allow letters + numbers, max 6 characters
    if (/^[a-zA-Z0-9]{0,6}$/.test(value)) {
      setOtp(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (otp.length !== 6) {
      toast.error("❌ OTP must be exactly 6 characters");
      return;
    }

    // Simulate verification success
    toast.success("✅ OTP verified successfully!");
    console.log("Entered OTP:", otp);
  };

  const handleResend = () => {
    toast.info("🔄 New OTP has been sent to your registered email/phone");
    console.log("Resend OTP clicked");
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center 
                 bg-gradient-to-br from-white via-blue-100 to-blue-500 
                 dark:from-gray-900 dark:via-black dark:to-emerald-900 px-4"
    >
      <form
        onSubmit={handleSubmit}
        className="bg-white/80 dark:bg-gray-800/80 shadow-lg rounded-lg p-8 w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-gray-100 mb-6">
          🔐 Verify OTP
        </h2>

        <div className="mb-6">
          <label
            htmlFor="otp"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            Enter One-Time Password
          </label>
          <input
            type="text"
            id="otp"
            name="otp"
            value={otp}
            onChange={handleChange}
            placeholder="Enter 6-character OTP"
            required
            maxLength={6} // ✅ enforce max length at input level
            className="w-full px-4 py-2 border border-indigo-400 rounded-md 
                       bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 
                       focus:ring-2 focus:ring-indigo-400 focus:outline-none tracking-widest uppercase"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white font-semibold py-2 px-4 rounded-md 
                     hover:bg-indigo-700 transition-colors dark:bg-indigo-500 dark:hover:bg-indigo-600"
        >
          Verify OTP
        </button>

        <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-4">
          Didn’t receive the code?{" "}
          <button
            type="button"
            onClick={handleResend}
            className="text-indigo-600 dark:text-emerald-400 font-semibold hover:underline"
          >
            Resend OTP
          </button>
        </p>
      </form>

      {/* Toast Container */}
      <ToastContainer position="top-right" autoClose={2500} />
    </div>
  );
};

export default OTPPage;