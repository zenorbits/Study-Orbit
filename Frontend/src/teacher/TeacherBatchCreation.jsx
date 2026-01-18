import React, { useState } from 'react';

const TeacherBatchCreation = () => {
  const [batchName, setBatchName] = useState('');
  const [batchDescription, setBatchDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ batchName, batchDescription });

    // Reset form after submit
    setBatchName('');
    setBatchDescription('');
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen 
      bg-gradient-to-br from-white via-blue-100 to-blue-500 
      dark:bg-gradient-to-br dark:from-gray-900 dark:via-black dark:to-emerald-900"
    >
      <div
        className="w-full max-w-lg rounded-xl shadow-xl p-8 
        bg-white/80 dark:bg-gray-800 border border-gray-200 dark:border-white/20"
      >
        <h2
          className="text-2xl font-bold text-center mb-6 
          text-sky-500 dark:text-emerald-400"
        >
          Create a New Batch
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Batch Name */}
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-200">
              Batch Name
            </label>
            <input
              type="text"
              value={batchName}
              onChange={(e) => setBatchName(e.target.value)}
              className="w-full px-4 py-2 rounded-lg 
              bg-white dark:bg-gray-700 
              text-black dark:text-white 
              placeholder-gray-400 dark:placeholder-gray-300 
              border border-gray-300 dark:border-white/30 
              focus:outline-none focus:ring-2 focus:ring-sky-400 dark:focus:ring-emerald-500"
              placeholder="Enter batch name"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-200">
              Description
            </label>
            <textarea
              value={batchDescription}
              onChange={(e) => setBatchDescription(e.target.value)}
              className="w-full px-4 py-2 rounded-lg 
              bg-white dark:bg-gray-700 
              text-black dark:text-white 
              placeholder-gray-400 dark:placeholder-gray-300 
              border border-gray-300 dark:border-white/30 
              focus:outline-none focus:ring-2 focus:ring-sky-400 dark:focus:ring-emerald-500"
              rows="4"
              placeholder="Enter batch description"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 rounded-lg font-semibold transition duration-200 
            bg-sky-500 hover:bg-sky-600 dark:bg-emerald-600 dark:hover:bg-emerald-700 text-white"
          >
            Create Batch
          </button>
        </form>
      </div>
    </div>
  );
};

export default TeacherBatchCreation;