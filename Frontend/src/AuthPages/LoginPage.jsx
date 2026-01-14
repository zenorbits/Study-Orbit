import React, { useState } from 'react';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login submitted:', formData);
  };

  return (
    <div className="flex items-center justify-center min-h-screen w-full bg-[#111] px-4">
      <div className="backdrop-blur-lg bg-white/10 shadow-2xl rounded-xl p-6 sm:p-8 md:p-10 w-full max-w-sm sm:max-w-md lg:max-w-lg border border-white/20">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-emerald-400 mb-6">
          Login
        </h2>
        <form className="space-y-4 sm:space-y-5" onSubmit={handleSubmit}>
          {/* Email */}
          <div>
            <label className="block text-gray-200 font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full px-3 py-2 sm:px-4 sm:py-2 border border-white/30 rounded-lg bg-white/10 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-400"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-200 font-medium mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              autoComplete="off"
              className="w-full px-3 py-2 sm:px-4 sm:py-2 border border-white/30 rounded-lg bg-white/10 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-400"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-emerald-500 text-white font-semibold py-2 sm:py-3 rounded-lg hover:bg-emerald-600 transition duration-200 active:scale-95"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;