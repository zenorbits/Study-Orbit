import React, { useEffect, useState } from "react";
import { useGetBatchInfoQuery, useGetBatchStudentQuery } from "../redux/api/batchApi";
import { Link, useParams } from "react-router-dom";
import { useDeleteUserMutation } from "../redux/api/userApi";
import { useDispatch, useSelector } from "react-redux";
import { searchFilter } from "../redux/features/searchInputFilter";
import { useGetStudentAttendanceQuery } from "../redux/api/attendanceApi";

// Component to show attendance percentage with hover details
const AttendancePercentage = ({ studentId }) => {
  const { data, isLoading, isError } = useGetStudentAttendanceQuery(studentId);

  if (isLoading) return <span className="text-gray-500">Loading...</span>;
  if (isError) return <span className="text-red-500">Error</span>;

  const percentage = data?.percentage?.toFixed(1);
  const presentDays = data?.presentDays || 0;
  const totalDays = data?.totalDays || 0;

  return (
    <span
      className="font-semibold text-emerald-600 dark:text-emerald-400 cursor-help"
      title={`${presentDays}/${totalDays} days present`}
    >
      {percentage}%
    </span>
  );
};

const BatchInfoPage = () => {
  const { id } = useParams();

  // Fetch batch metadata
  const { data: batchInfo, isLoading, isError } = useGetBatchInfoQuery(id);

  // Redux search filter
  const inputFilter = useSelector((state) => state.searchFilter.input);
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    console.log(inputFilter);
  }, [inputFilter]);

  // Fetch students
  const {
    data: students,
    isLoading: isStudentLoading,
    isError: isStudentError,
  } = useGetBatchStudentQuery(id);

  // Delete mutation
  const [deleteStudent] = useDeleteUserMutation();

  // Handle delete with confirmation
  const handleDelete = async (studentId) => {
    const confirmed = window.confirm("Are you sure you want to delete this student?");
    if (confirmed) {
      await deleteStudent(studentId);
    }
  };


  // Full-screen loading/error states
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen w-screen bg-gradient-to-br from-white via-blue-100 to-blue-500 dark:from-gray-900 dark:via-black dark:to-emerald-900">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mr-4"></div>
        <p className="text-2xl font-semibold text-gray-900 dark:text-white animate-pulse">
          📘 Loading batch info...
        </p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center h-screen w-screen">
        <p className="text-2xl font-semibold text-red-600">❌ Error fetching batch info</p>
      </div>
    );
  }

  if (isStudentLoading) {
    return (
      <div className="flex items-center justify-center h-screen w-screen bg-gradient-to-br from-white via-blue-100 to-blue-500 dark:from-gray-900 dark:via-black dark:to-emerald-900">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mr-4"></div>
        <p className="text-2xl font-semibold text-gray-900 dark:text-white animate-pulse">
          👩‍🎓 Loading students...
        </p>
      </div>
    );
  }

  if (isStudentError) {
    return (
      <div className="flex items-center justify-center h-screen w-screen">
        <p className="text-2xl font-semibold text-red-600">❌ Error fetching students</p>
      </div>
    );
  }

  // Apply search filter to students
  const studentList = students?.students || [];
  const filteredStudents = studentList.filter((student) => {
    const searchTerm = inputFilter.toLowerCase();
    return (
      (student.username && student.username.toLowerCase().includes(searchTerm)) ||
      (student.name && student.name.toLowerCase().includes(searchTerm)) ||
      (student.phoneNumber && student.phoneNumber.toLowerCase().includes(searchTerm)) ||
      (student.phone && student.phone.toLowerCase().includes(searchTerm))
    );
  });

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
          <h2 className="text-2xl font-bold mb-2">{batchInfo?.data?.batchname}</h2>
          <p className="mb-2">{batchInfo?.data?.description}</p>
          <p className="text-sm">
            <span className="font-semibold">Code:</span>{" "}
            <span className="text-blue-600 dark:text-blue-400 font-bold">
              {batchInfo?.data?.code}
            </span>
          </p>
          <p className="text-sm mt-2">
            <span className="font-semibold">Status:</span>{" "}
            <span className="capitalize">{batchInfo?.data?.status}</span>
          </p>
          <p className="text-sm mt-2">
            <span className="font-semibold">Created At:</span>{" "}
            {new Date(batchInfo?.data?.createdAt).toLocaleDateString()}
          </p>
        </div>

        {/* Attendance button */}
        <Link
          to="/admin/attendance"
          className="px-6 py-2 
                     bg-sky-600 hover:bg-sky-700 
                     dark:bg-emerald-600 dark:hover:bg-emerald-700 
                     text-white rounded-md shadow-md 
                     transition-transform transform hover:scale-105 
                     h-fit self-start md:self-center"
        >
          ✅ Take Today's Attendance
        </Link>
      </div>

      {/* Students section */}
      <div className="w-11/12 md:w-3/4 overflow-x-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-3">
          <h2 className="text-xl font-bold">👩‍🎓 Students</h2>
          <input
            type="text"
            onChange={(e) => {
              setInputValue(e.target.value);
              dispatch(searchFilter(e.target.value));
            }}
            value={inputValue}
            placeholder="Search students..."
            className="w-full md:w-1/3 px-3 py-2 border border-gray-300 dark:border-gray-600 
                       rounded-md focus:outline-none focus:ring-2 focus:ring-sky-400 
                       dark:bg-gray-800 dark:text-white"
          />
        </div>

        {filteredStudents.length === 0 ? (
          <p className="text-center text-gray-600 dark:text-gray-300 py-6">
            No students currently
          </p>
        ) : (
          <table className="min-w-full border-collapse border border-gray-300 dark:border-gray-600 text-sm md:text-base">
            <thead>
              <tr className="bg-sky-200 dark:bg-emerald-700 text-gray-900 dark:text-white">
                <th className="border px-2 md:px-4 py-2">#</th>
                <th className="border px-2 md:px-4 py-2">Name</th>
                <th className="border px-2 md:px-4 py-2">Phone Number</th>
                <th className="border px-2 md:px-4 py-2">Attendance</th>
                <th className="border px-2 md:px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((student, index) => (
                <tr key={student._id} className="hover:bg-sky-100 dark:hover:bg-gray-700 transition">
                  <td className="border px-2 md:px-4 py-2">{index + 1}</td>
                  <td className="border px-2 md:px-4 py-2">{student.username || student.name}</td>
                  <td className="border px-2 md:px-4 py-2">{student.phoneNumber || student.phone}</td>
                  <td className="border px-2 md:px-4 py-2">
                    <AttendancePercentage studentId={student._id} />
                  </td>
                  <td className="border px-2 md:px-4 py-2 text-center">
                    <button
                      onClick={() => handleDelete(student._id)}
                      className="px-2 md:px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-xs md:text-sm"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default BatchInfoPage;