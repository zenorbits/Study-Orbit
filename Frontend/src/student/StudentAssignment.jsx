import React from "react";
import { useParams } from "react-router-dom";
import { useGetAssignmentsByBatchQuery } from "../redux/api/assignmentsApi";


const StudentAssignment = () => {
  const { batchId } = useParams(); // get batchId from route
  const { data, isLoading, isError, refetch } = useGetAssignmentsByBatchQuery(batchId);

  const assignments = data?.data || [];

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[80vh]">
        <p className="text-lg font-semibold text-sky-600 dark:text-emerald-400">
          Loading assignments...
        </p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col justify-center items-center min-h-[80vh]">
        <p className="text-lg font-semibold text-red-600">
          Error fetching assignments.
        </p>
        <button
          onClick={refetch}
          className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div
      className="min-h-[80vh] flex flex-col items-center py-10 
      bg-gradient-to-br from-white via-blue-100 to-blue-500 
      dark:from-gray-900 dark:via-black dark:to-emerald-900"
    >
      {/* Header */}
      <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-100">
        📘 Assignments for Batch
      </h1>

      {assignments.length === 0 ? (
        <p className="text-lg font-semibold text-gray-700 dark:text-gray-300">
          No assignments found for this batch.
        </p>
      ) : (
        <main className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-11/12 md:w-4/5">
          {assignments.map((assignment) => (
            <div
              key={assignment._id}
              className="rounded-lg shadow-md p-6 bg-white/80 dark:bg-gray-800/80 
                text-gray-800 dark:text-gray-100 border border-sky-300 dark:border-emerald-600 
                hover:shadow-lg transition flex flex-col justify-between"
            >
              <div>
                <h2 className="text-xl font-bold mb-2">{assignment.title}</h2>
                <p className="text-sm opacity-80 mb-4">{assignment.description}</p>
                <p className="text-sm font-semibold text-purple-600 dark:text-purple-400">
                  Due: {new Date(assignment.dueDate).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </main>
      )}
    </div>
  );
};

export default StudentAssignment;