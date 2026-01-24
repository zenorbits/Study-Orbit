import React from "react";
import { useSelector } from "react-redux";
import { useFetchJoinedBatchQuery } from "../../redux/api/batchApi";

const Mybatches = () => {
  const theme = useSelector((state) => state.toggleTheme.value);
  const { data, isLoading, isError, refetch } = useFetchJoinedBatchQuery();
  const joinedBatches = data?.batches || [];

  return (
    <div
      className={`min-h-[80vh] flex flex-col items-center py-10 
      ${theme === "Dark"
        ? "bg-gradient-to-br from-gray-900 via-black to-emerald-900 text-white"
        : "bg-gradient-to-br from-white via-sky-100 to-sky-300 text-sky-900"}`}
    >
      {/* Header */}
      <h1 className="text-3xl font-bold mb-6">My Joined Batches</h1>

      {/* Refresh Button */}
      <button
        onClick={refetch}
        className={`mb-6 px-4 py-2 rounded-md font-semibold shadow-md hover:scale-105 transition 
        ${theme === "Dark" ? "bg-emerald-500 text-white" : "bg-sky-500 text-white"}`}
      >
        Refresh
      </button>

      {/* Loading / Error States */}
      {isLoading ? (
        <p className="text-lg font-semibold">Loading your batches...</p>
      ) : isError ? (
        <p className="text-lg font-semibold text-red-500">Error fetching batches.</p>
      ) : joinedBatches.length === 0 ? (
        <p className="text-lg font-semibold">You haven’t joined any batches yet.</p>
      ) : (
        <main className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-11/12 md:w-4/5">
          {joinedBatches.map((batch) => (
            <div
              key={batch._id}
              className={`rounded-lg shadow-md p-6 
                ${theme === "Dark" ? "bg-black/40 border border-emerald-600" : "bg-white/80 border border-sky-300"} 
                hover:shadow-lg transition`}
            >
              <h2 className="text-xl font-bold mb-2">{batch.batchname}</h2>
              <p className="text-sm opacity-80 mb-4">{batch.description}</p>
            </div>
          ))}
        </main>
      )}
    </div>
  );
};

export default Mybatches;