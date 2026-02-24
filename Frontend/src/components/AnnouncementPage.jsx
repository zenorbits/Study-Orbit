import React, { useState } from 'react';

const AnnouncementPage = ({ role }) => {
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const announcements = [
    {
      title: "Exam Schedule Released",
      message: "The final exam timetable has been published. Please check the notice board."
    },
    {
      title: "Holiday Notice",
      message: "School will remain closed on Friday due to maintenance."
    }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      setError("Title cannot be empty");
      return;
    }
    // Normally you’d push this to state or backend
    console.log("New Announcement:", { title, message });
    setError("");
    setTitle("");
    setMessage("");
    setShowForm(false);
  };

  return (
    <div
      className="min-h-[80vh] w-full font-mono p-10
        bg-gradient-to-br from-white via-blue-100 to-blue-500
        dark:from-gray-900 dark:via-black dark:to-emerald-900
        text-gray-900 dark:text-white"
    >
      <h1 className="text-3xl font-bold mb-8">📢 Announcements</h1>

      {announcements.map((a, index) => (
        <div
          key={index}
          className="border border-emerald-500 rounded-lg p-6 mb-6
            bg-white/80 dark:bg-black/40 backdrop-blur-md shadow-lg"
        >
          <h2 className="text-xl font-semibold mb-2 text-sky-600 dark:text-emerald-400">
            {a.title}
          </h2>
          <p className="text-gray-700 dark:text-gray-200">{a.message}</p>
        </div>
      ))}

      {(role === "admin" || role === "teacher") && (
        <button
          onClick={() => setShowForm(true)}
          className="mt-6 px-5 py-2 bg-emerald-600 text-white rounded-md
            hover:bg-emerald-700 transition shadow-md
            dark:bg-emerald-500 dark:hover:bg-emerald-600"
        >
          ➕ Add Announcement
        </button>
      )}

      {/* Modal Form */}
      {showForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-11/12 md:w-2/3 lg:w-1/2 p-6 relative">
            {/* Close Button */}
            <button
              onClick={() => setShowForm(false)}
              className="absolute top-3 right-3 text-gray-600 dark:text-gray-300 hover:text-red-500"
            >
              ❌
            </button>

            <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100">
              Add New Announcement
            </h2>

            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="p-2 rounded-md border border-gray-300 dark:border-gray-600
                  bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
              />
              {error && <p className="text-red-500 text-sm">{error}</p>}
              <textarea
                placeholder="Message"
                rows="4"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="p-2 rounded-md border border-gray-300 dark:border-gray-600
                  bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
              ></textarea>
              <button
                type="submit"
                className="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700
                  dark:bg-emerald-500 dark:hover:bg-emerald-600 transition"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AnnouncementPage;