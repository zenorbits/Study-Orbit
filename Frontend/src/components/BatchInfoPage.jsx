import React from "react";

const BatchInfoPage = () => {
  // Dummy data for UI preview
  const batch = {
    batchname: "Batch A",
    description: "This is a sample batch description.",
    code: "BATCH123",
    students: [
      { _id: 1, name: "Alice Johnson", phone: "+91 9876543210", attendance: "Present" },
      { _id: 2, name: "Bob Smith", phone: "+91 9123456789", attendance: "Absent" },
      { _id: 3, name: "Charlie Brown", phone: "+91 9988776655", attendance: "Present" },
    ],
  };

  

  return (
    <div
      className="min-h-[80vh] w-full flex flex-col items-center py-10
      bg-gradient-to-br from-white via-blue-100 to-blue-500
      dark:from-gray-900 dark:via-black dark:to-emerald-900
      text-gray-900 dark:text-white"
    >
      <h1 className="text-3xl font-bold mb-6 text-center">📘 Batch Information</h1>

      {/* Batch details + Attendance button side by side */}
      <div className="flex flex-col md:flex-row justify-between items-start w-11/12 md:w-3/4 mb-8 gap-4">
        {/* Batch details box */}
        <div className="bg-white/40 dark:bg-black/40 backdrop-blur-md rounded-lg shadow-md p-6 flex-1">
          <h2 className="text-2xl font-bold mb-2">{batch.batchname}</h2>
          <p className="mb-2">{batch.description}</p>
          <p className="text-sm">
            <span className="font-semibold">Code:</span>{" "}
            <span className="text-blue-600 dark:text-blue-400 font-bold">
              {batch.code}
            </span>
          </p>
        </div>

        {/* Attendance button */}
        <button
          className="px-6 py-2 
                     bg-sky-600 hover:bg-sky-700 
                     dark:bg-emerald-600 dark:hover:bg-emerald-700 
                     text-white rounded-md shadow-md 
                     transition-transform transform hover:scale-105 
                     h-fit self-start md:self-center"
        >
          ✅ Take Today's Attendance
        </button>
      </div>

      {/* Students section */}
      <div className="w-11/12 md:w-3/4 overflow-x-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-3">
          <h2 className="text-xl font-bold">👩‍🎓 Students</h2>
          {/* Search bar */}
          <input
            type="text"
            placeholder="Search students..."
            className="w-full md:w-1/3 px-3 py-2 border border-gray-300 dark:border-gray-600 
                       rounded-md focus:outline-none focus:ring-2 focus:ring-sky-400 
                       dark:bg-gray-800 dark:text-white"
          />
        </div>

        <table className="min-w-full border-collapse border border-gray-300 dark:border-gray-600 text-sm md:text-base">
          <thead>
            <tr className="bg-sky-200 dark:bg-emerald-700 text-gray-900 dark:text-white">
              <th className="border border-gray-300 dark:border-gray-600 px-2 md:px-4 py-2">#</th>
              <th className="border border-gray-300 dark:border-gray-600 px-2 md:px-4 py-2">Name</th>
              <th className="border border-gray-300 dark:border-gray-600 px-2 md:px-4 py-2">Phone Number</th>
              <th className="border border-gray-300 dark:border-gray-600 px-2 md:px-4 py-2">Attendance</th>
              <th className="border border-gray-300 dark:border-gray-600 px-2 md:px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {batch.students.map((student, index) => (
              <tr
                key={student._id}
                className="hover:bg-sky-100 dark:hover:bg-gray-700 transition"
              >
                <td className="border border-gray-300 dark:border-gray-600 px-2 md:px-4 py-2">
                  {index + 1}
                </td>
                <td className="border border-gray-300 dark:border-gray-600 px-2 md:px-4 py-2">
                  {student.name}
                </td>
                <td className="border border-gray-300 dark:border-gray-600 px-2 md:px-4 py-2">
                  {student.phone}
                </td>
                <td className="border border-gray-300 dark:border-gray-600 px-2 md:px-4 py-2">
                  {student.attendance}
                </td>
                <td className="border border-gray-300 dark:border-gray-600 px-2 md:px-4 py-2 text-center">
                  <button
                    className="px-2 md:px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-xs md:text-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BatchInfoPage;