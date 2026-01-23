import React, { useState } from "react";
import { useSelector } from "react-redux";

const BrowseBatch = () => {
  const theme = useSelector((state) => state.toggleTheme.value);

  // Temporary sample data (replace with your API data later)
  const batches = [
    {
      batchname: "Batch A1",
      description: "Morning batch for Mathematics",
    },
    {
      batchname: "Batch B2",
      description: "Evening batch for Science",
    },
  ];

  const [selectedBatch, setSelectedBatch] = useState(null);
  const [batchCode, setBatchCode] = useState("");

  const handleJoinClick = (batch) => {
    setSelectedBatch(batch);
    setBatchCode("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Replace with your actual join logic (API call, etc.)
    alert(`Requested to join ${selectedBatch.batchname} with code: ${batchCode}`);
    setSelectedBatch(null); // close form after submit
  };

  return (
    <div
      className={`min-h-[80vh] flex flex-col items-center py-10 
      ${theme === "Dark"
        ? "bg-gradient-to-br from-gray-900 via-black to-emerald-900 text-white"
        : "bg-gradient-to-br from-white via-sky-100 to-sky-300 text-sky-900"}`}
    >
      {/* Header */}
      <h1 className="text-3xl font-bold mb-8">Browse Batches</h1>

      {/* Batch Grid */}
      <main className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-11/12 md:w-4/5">
        {batches.length === 0 ? (
          <p className="text-center text-lg font-semibold col-span-full">
            No batches available.
          </p>
        ) : (
          batches.map((batch, index) => (
            <div
              key={index}
              className={`rounded-lg shadow-md p-6 
                ${theme === "Dark" ? "bg-black/40 border border-emerald-600" : "bg-white/80 border border-sky-300"} 
                hover:shadow-lg transition`}
            >
              <h2 className="text-xl font-bold mb-2">{batch.batchname}</h2>
              <p className="text-sm opacity-80 mb-4">{batch.description}</p>

              {/* Join Button */}
              <button
                onClick={() => handleJoinClick(batch)}
                className={`px-4 py-2 rounded-md font-semibold shadow-md hover:scale-105 transition 
                ${theme === "Dark" ? "bg-emerald-500 text-white" : "bg-sky-500 text-white"}`}
              >
                Join
              </button>
            </div>
          ))
        )}
      </main>

      {/* Join Form Modal */}
      {selectedBatch && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm"
        >
          <div
            className={`p-6 rounded-lg shadow-lg w-96 
            ${theme === "Dark" ? "bg-gray-800 text-white" : "bg-white text-sky-900"}`}
          >
            <h2 className="text-xl font-bold mb-4">
              Join {selectedBatch.batchname}
            </h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input
                type="text"
                value={batchCode}
                onChange={(e) => setBatchCode(e.target.value)}
                placeholder="Enter Batch Code"
                className={`px-4 py-2 rounded-md border focus:outline-none 
                ${theme === "Dark" ? "bg-gray-700 border-emerald-500" : "bg-gray-100 border-sky-400"}`}
                required
              />
              <div className="flex gap-4 justify-end">
                <button
                  type="button"
                  onClick={() => setSelectedBatch(null)}
                  className={`px-4 py-2 rounded-md font-semibold shadow-md 
                  ${theme === "Dark" ? "bg-red-500 text-white" : "bg-red-600 text-white"}`}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className={`px-4 py-2 rounded-md font-semibold shadow-md 
                  ${theme === "Dark" ? "bg-emerald-500 text-white" : "bg-sky-500 text-white"}`}
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default BrowseBatch;