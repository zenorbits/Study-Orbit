import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useUserRegisterMutation } from '../redux/api/authApi';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { setCredentials } from '../redux/features/authApiSlice';

const RegisterPage = () => {
  const selector = useSelector((state) => state.toggleTheme.value);
  const [registerMutation, { isLoading }] = useUserRegisterMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (selector === 'Dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [selector]);

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    specialKey: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { username, email, password, specialKey } = formData;

    // ✅ Validation check
    if (!username || !email || !password) {
      toast.error('Please fill in all required credentials ❌');
      return;
    }

    try {
      const response = await registerMutation({
        username,
        email,
        password,
        secretKey: specialKey
      });

      console.log(response);

      if (response?.data) {
        const { user, token } = response.data;

        dispatch(setCredentials({
          username: user.username,
          email: user.email,
          role: user.role,
          token
        }));

        toast.success('Registration successful 🎉');
        setFormData({ username: '', email: '', password: '', specialKey: '' });
        navigate('/login'); // redirect after success
      } else if (response?.error) {
        toast.error(response.error.data?.message || 'Registration failed ❌');
      }
    } catch (err) {
      toast.error('Something went wrong ❌');
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen w-full px-4 
      bg-gradient-to-br from-white via-blue-100 to-blue-500 
      dark:bg-gradient-to-br dark:from-gray-900 dark:via-black dark:to-emerald-900"
    >
      <div className="backdrop-blur-lg bg-white/70 dark:bg-gradient-to-br from-gray-900 via-black to-emerald-900 shadow-2xl rounded-xl p-6 sm:p-8 md:p-10 w-full max-w-sm sm:max-w-md lg:max-w-lg border border-gray-200 dark:border-white/20">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-sky-500 dark:text-emerald-400 mb-6">
          Register
        </h2>
        <form className="space-y-4 sm:space-y-5" onSubmit={handleSubmit}>
          {/* Name */}
          <div>
            <label className="block text-gray-700 dark:text-gray-200 font-medium mb-1">Name</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter your name"
              className="w-full px-3 py-2 sm:px-4 sm:py-2 border border-gray-300 dark:border-white/30 rounded-lg bg-white dark:bg-white/10 text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-400"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-700 dark:text-gray-200 font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full px-3 py-2 sm:px-4 sm:py-2 border border-gray-300 dark:border-white/30 rounded-lg bg-white dark:bg-white/10 text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-400"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-700 dark:text-gray-200 font-medium mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              autoComplete="off"
              className="w-full px-3 py-2 sm:px-4 sm:py-2 border border-gray-300 dark:border-white/30 rounded-lg bg-white dark:bg-white/10 text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-400"
            />
          </div>

          {/* Special Optional Key */}
          <div>
            <label className="block text-gray-700 dark:text-gray-200 font-medium mb-1">
              Special Key
            </label>
            <input
              type="text"
              name="specialKey"
              value={formData.specialKey}
              onChange={handleChange}
              placeholder="Enter special key "
              autoComplete="off"
              className="w-full px-3 py-2 sm:px-4 sm:py-2 border border-gray-300 dark:border-white/30 rounded-lg bg-white dark:bg-white/10 text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-400"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-sky-500 dark:bg-emerald-500 text-white font-semibold py-2 sm:py-3 rounded-lg hover:bg-sky-600 dark:hover:bg-emerald-600 transition duration-200 active:scale-95 disabled:opacity-50"
          >
            {isLoading ? 'Registering...' : 'Register'}
          </button>
        </form>

        <div className="text flex justify-center pt-5 space-x-2">
          <span className="text-black dark:text-white">Already have an account?</span>
          <Link
            to="/login"
            className="text-sky-500 hover:text-sky-800 dark:text-emerald-400 dark:hover:text-emerald-500 cursor-pointer"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;