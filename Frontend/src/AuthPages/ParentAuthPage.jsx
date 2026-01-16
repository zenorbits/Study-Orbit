import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleMode } from '../redux/features/toggleThemeSlice';

const ParentAuthPage = ({ children }) => {
  const selector = useSelector((state) => state.toggleTheme.value);
  const dispatch = useDispatch();

  useEffect(() => {
    if (selector === 'Dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [selector]);

  return (
    <div>
      <button
        onClick={() => dispatch(toggleMode())}
        className="absolute top-4 right-4 px-4 py-2 rounded-lg dark:bg-emerald-400 dark:hover:bg-emerald-500 bg-sky-500 text-white font-semibold hover:bg-sky-600 transition duration-200"
      >
        {selector === 'Dark' ? 'Light Mode ☀️' : 'Dark Mode 🌙'}
      </button>

      {/* ✅ Render the child page (Register or Login) */}
      {children}
    </div>
  );
};

export default ParentAuthPage;