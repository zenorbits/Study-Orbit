import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchFilter } from "../redux/features/searchInputFilter";
const ManageTeacher = () => {
    // two-way binding state
    const [searchValue, setSearchValue] = useState("");

    const selector = useSelector((state) => state.searchFilter.input);
    const dispatch = useDispatch();


    const [teachers] = useState([
        { id: 1, name: "John Doe", email: "john@example.com", subject: "Mathematics", batch: "Batch A" },
        { id: 2, name: "Jane Smith", email: "jane@example.com", subject: "Physics", batch: "Batch B" },
        { id: 3, name: "Mark Johnson", email: "mark@example.com", subject: "Chemistry", batch: "Batch C" },
    ]);

    const filteredTeachers = teachers.filter((teacher) =>
        teacher.name.toLowerCase().includes(selector.toLowerCase()) ||
        teacher.email.toLowerCase().includes(selector.toLowerCase()) ||
        teacher.subject.toLowerCase().includes(selector.toLowerCase()) ||
        teacher.batch.toLowerCase().includes(selector.toLowerCase())
    );

    return (
        <div
            className="min-h-screen p-4 sm:p-6 
      bg-gradient-to-br from-white via-blue-100 to-blue-500 
      dark:from-gray-900 dark:via-black dark:to-emerald-900"
        >
            {/* Page Header */}
            <header className="mb-6 text-center">
                <h1 className="text-xl sm:text-2xl font-bold text-sky-900 dark:text-emerald-200">
                    Manage Teachers
                </h1>
                <p className="text-sm sm:text-base text-gray-700 dark:text-gray-400">
                    Add, edit, and manage teacher records
                </p>
            </header>

            {/* Action Bar */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6 w-full sm:w-11/12 md:w-4/5 mx-auto">
                <input
                    type="text"
                    placeholder="Search teacher..."
                    value={searchValue}
                    onChange={(e) => {
                        setSearchValue(e.target.value);
                        dispatch(searchFilter(e.target.value));
                    }} // updates state
                    className="w-full sm:w-1/3 px-3 py-2 rounded-lg
          bg-white text-gray-900 border border-sky-300
          focus:outline-none focus:ring-2 focus:ring-sky-500
          dark:bg-gray-800 dark:text-emerald-200 dark:border-emerald-600"
                />
                <button className="w-full sm:w-auto bg-sky-600 text-white px-4 py-2 rounded-lg hover:bg-sky-700">
                    + Add Teacher
                </button>
            </div>

            {/* Teacher Table */}
            <div
                className="bg-white/40 dark:bg-black/40 backdrop-blur-md 
        border border-sky-200 dark:border-emerald-600 
        shadow-md rounded-lg overflow-x-auto w-full sm:w-11/12 md:w-4/5 mx-auto"
            >
                <table className="min-w-full border-collapse text-sm sm:text-base">
                    <thead className="bg-sky-100 dark:bg-gray-800">
                        <tr>
                            <th className="px-4 sm:px-6 py-3 text-left font-semibold text-sky-900 dark:text-emerald-200">
                                Name
                            </th>
                            <th className="px-4 sm:px-6 py-3 text-left font-semibold text-sky-900 dark:text-emerald-200">
                                Email
                            </th>
                            <th className="px-4 sm:px-6 py-3 text-left font-semibold text-sky-900 dark:text-emerald-200">
                                Subject
                            </th>
                            <th className="px-4 sm:px-6 py-3 text-left font-semibold text-sky-900 dark:text-emerald-200">
                                Batch
                            </th>
                            <th className="px-4 sm:px-6 py-3 text-left font-semibold text-sky-900 dark:text-emerald-200">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredTeachers.map((teacher) => (
                            <tr
                                key={teacher.id}
                                className="border-t border-sky-200 dark:border-emerald-600 hover:bg-sky-50 dark:hover:bg-gray-700 transition"
                            >
                                <td className="px-4 sm:px-6 py-4 text-sky-900 dark:text-emerald-200">
                                    {teacher.name}
                                </td>
                                <td className="px-4 sm:px-6 py-4 text-gray-700 dark:text-gray-300">
                                    {teacher.email}
                                </td>
                                <td className="px-4 sm:px-6 py-4 text-gray-700 dark:text-gray-300">
                                    {teacher.subject}
                                </td>
                                <td className="px-4 sm:px-6 py-4 text-gray-700 dark:text-gray-300">
                                    {teacher.batch}
                                </td>
                                <td className="px-4 sm:px-6 py-4">
                                    <button className="text-red-600 hover:underline">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageTeacher;