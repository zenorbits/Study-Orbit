import React, { useState, useEffect } from "react";
import { useGetVerifiedBatchQuery, useGetBatchStudentQuery } from "../redux/api/batchApi";
import { useMarkAttendanceMutation } from "../redux/api/attendanceApi";
import { toast } from "react-toastify";

const AttendancePage = () => {
  const { data: batchData, isLoading, isError } = useGetVerifiedBatchQuery();
  const verifiedBatches = batchData?.batches || [];

  const [selectedBatchId, setSelectedBatchId] = useState("");
  const [attendanceRecords, setAttendanceRecords] = useState({});
  const [attendanceDate, setAttendanceDate] = useState(
    new Date().toISOString().split("T")[0] // default to today
  );

  const [markAttendance, { isLoading: submitting }] = useMarkAttendanceMutation();

  // Default to first batch
  useEffect(() => {
    if (verifiedBatches.length > 0 && !selectedBatchId) {
      setSelectedBatchId(verifiedBatches[0]._id);
    }
  }, [verifiedBatches, selectedBatchId]);

  // Fetch students for the selected batch
  const {
    data: studentData,
    isLoading: loadingStudents,
    isError: studentError,
  } = useGetBatchStudentQuery(selectedBatchId, { skip: !selectedBatchId });

  const students = studentData?.students || [];

  // Initialize attendance state
  useEffect(() => {
    if (students.length > 0) {
      const initial = {};
      students.forEach((s) => {
        initial[s._id] = "absent";
      });
      setAttendanceRecords(initial);
    }
  }, [students]);

  const toggleAttendance = (studentId) => {
    setAttendanceRecords((prev) => ({
      ...prev,
      [studentId]: prev[studentId] === "present" ? "absent" : "present",
    }));
  };

  const handleSubmit = async () => {
    try {
      const records = Object.entries(attendanceRecords).map(([studentId, status]) => ({
        studentId,
        status,
      }));

      await markAttendance({ batchId: selectedBatchId, records, date: attendanceDate }).unwrap();
      toast.success("✅ Attendance marked successfully!");
    } catch (error) {
      toast.error(error?.data?.message || "❌ Failed to mark attendance");
    }
  };

  if (isLoading) return <p>Loading batches...</p>;
  if (isError) return <p>Error fetching batches</p>;
  if (loadingStudents) return <p>Loading students...</p>;
  if (studentError) return <p>Error fetching students</p>;

  return (
    <div className="min-h-[80vh] w-full font-mono p-10
      bg-gradient-to-br from-white via-green-100 to-green-500
      dark:from-gray-900 dark:via-black dark:to-emerald-900
      text-gray-900 dark:text-white">

      <h1 className="text-3xl font-bold mb-6">📋 Daily Attendance</h1>

      {/* Batch selector */}
      {verifiedBatches.length > 0 && (
        <div className="mb-6">
          <label className="block mb-2 font-semibold">Select Batch:</label>
          <select
            value={selectedBatchId}
            onChange={(e) => setSelectedBatchId(e.target.value)}
            className="p-2 rounded-md border border-gray-300 dark:border-gray-600
              bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            {verifiedBatches.map((b) => (
              <option key={b._id} value={b._id}>
                {b.batchname}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Date selector */}
      <div className="mb-6">
        <label className="block mb-2 font-semibold">Select Date:</label>
        <input
          type="date"
          value={attendanceDate}
          onChange={(e) => setAttendanceDate(e.target.value)}
          className="p-2 rounded-md border border-gray-300 dark:border-gray-600
            bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
        />
      </div>

      {/* Student checklist */}
      {students.length > 0 ? (
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200 dark:bg-gray-700">
              <th className="p-3 text-left">Student</th>
              <th className="p-3 text-center">Present</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student._id} className="border-b dark:border-gray-600">
                <td className="p-3">{student.name || student.username}</td>
                <td className="p-3 text-center">
                  <input
                    type="checkbox"
                    checked={attendanceRecords[student._id] === "present"}
                    onChange={() => toggleAttendance(student._id)}
                    className="w-5 h-5 accent-green-600"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No students found for this batch</p>
      )}

      {/* Submit Attendance Button */}
      <button
        onClick={handleSubmit}
        disabled={submitting}
        className="mt-6 px-6 py-2 bg-emerald-600 text-white rounded-md
          hover:bg-emerald-700 transition shadow-md disabled:opacity-50"
      >
        {submitting ? "Submitting..." : "✅ Submit Attendance"}
      </button>
    </div>
  );
};

export default AttendancePage;