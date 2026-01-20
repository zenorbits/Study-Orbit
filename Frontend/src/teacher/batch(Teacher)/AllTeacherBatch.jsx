import React from "react";
import { useSelector } from "react-redux";
import { useGetBatchForTeacherQuery } from "../../redux/api/batchApi";

const AllTeacherBatch = () => {
  const theme = useSelector((state) => state.toggleTheme.value);

  const { data, isLoading, isError } = useGetBatchForTeacherQuery();
  const batches = data?.batches || []; // ✅ safe fallback

  

  const getStatusColor = (status) =>
    status === "Verified"
      ? "text-green-600 dark:text-green-400 font-bold"
      : "text-yellow-600 dark:text-yellow-400 font-bold";

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[80vh]">
        <p className="text-lg font-semibold text-sky-700 dark:text-emerald-300">
          Loading batches...
        </p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center min-h-[80vh]">
        <p className="text-lg font-semibold text-red-600">
          Error fetching batches. Please try again.
        </p>
      </div>
    );
  }

  return (
    <div
      className="min-h-[80vh] flex items-center justify-center py-10 
      bg-gradient-to-br from-white via-blue-100 to-blue-500 
      dark:from-gray-900 dark:via-black dark:to-emerald-900"
    >
      <main className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-11/12 md:w-4/5">
        {batches.length === 0 ? (
          <p className="text-center text-lg font-semibold text-sky-700 dark:text-emerald-300 col-span-full">
            No batches found.
          </p>
        ) : (
          batches.map((batch, index) => (
            <div
              key={index}
              className="h-40 rounded-lg 
                bg-white/40 dark:bg-black/40 backdrop-blur-md 
                border border-sky-200 dark:border-emerald-600 
                shadow-md hover:shadow-xl 
                flex flex-col items-start justify-center px-4
                text-sky-900 dark:text-emerald-200 
                hover:scale-105 hover:brightness-110 
                transition-transform duration-300"
            >
              <h2 className="text-lg font-extrabold mb-1">{batch.batchname}</h2>
              <p className="text-xs opacity-90">{batch.description}</p>
              <p className={`text-xs mt-1 ${getStatusColor(batch.status)}`}>
                <span className="font-semibold">Status:</span> {batch.status}
              </p>
              <p className="text-xs text-purple-600 dark:text-purple-400">
                <span className="font-semibold">Created By:</span>{" "}
                {batch.createdBy?.name || "Unknown"}
              </p>
              <p className="text-xs">
                <span className="font-semibold">Code:</span>{" "}
                <span className="text-blue-600 dark:text-blue-400 font-bold">
                  {batch.code}
                </span>
              </p>
            </div>
          ))
        )}
      </main>
    </div>
  );
};

export default AllTeacherBatch;