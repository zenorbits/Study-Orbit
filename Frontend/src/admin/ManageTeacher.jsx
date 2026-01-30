import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchFilter } from "../redux/features/searchInputFilter";
import { useFetchTeacherQuery } from "../redux/api/userApi";

const ManageTeacher = () => {
    const [searchValue, setSearchValue] = useState("");
    const selector = useSelector((state) => state.searchFilter.input);
    const dispatch = useDispatch();

    const { data, isLoading, isError } = useFetchTeacherQuery();
    const teachers = data?.teachers || [];

    useEffect(() => {
        console.log(teachers);
    }, [teachers]);

    if (isLoading) {
        return (
            <div className="min-h-screen p-4 sm:p-6 bg-gradient-to-br from-white via-blue-100 to-blue-500 dark:from-gray-900 dark:via-black dark:to-emerald-900 flex flex-col items-center justify-center">
                {/* Spinner */}
                <div className="w-16 h-16 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
                <p className="mt-4 text-lg font-semibold text-blue-600 dark:text-emerald-200">
                    Loading teachers...
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                    Please wait while we fetch the records.
                </p>

                {/* Skeleton Table */}
                <div className="mt-10 bg-white/40 dark:bg-black/40 backdrop-blur-md border border-sky-200 dark:border-emerald-600 shadow-md rounded-lg overflow-x-auto w-full sm:w-11/12 md:w-4/5">
                    <table className="min-w-full border-collapse text-sm sm:text-base">
                        <thead className="bg-sky-100 dark:bg-gray-800">
                            <tr>
                                <th className="px-4 sm:px-6 py-3 text-left">Name</th>
                                <th className="px-4 sm:px-6 py-3 text-left">Email</th>
                                <th className="px-4 sm:px-6 py-3 text-left">Phone</th>
                                <th className="px-4 sm:px-6 py-3 text-left">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {[...Array(5)].map((_, i) => (
                                <tr key={i} className="border-t border-sky-200 dark:border-emerald-600">
                                    <td className="px-4 sm:px-6 py-4">
                                        <div className="h-4 w-24 bg-gray-300 dark:bg-gray-700 rounded animate-pulse"></div>
                                    </td>
                                    <td className="px-4 sm:px-6 py-4">
                                        <div className="h-4 w-32 bg-gray-300 dark:bg-gray-700 rounded animate-pulse"></div>
                                    </td>
                                    <td className="px-4 sm:px-6 py-4">
                                        <div className="h-4 w-20 bg-gray-300 dark:bg-gray-700 rounded animate-pulse"></div>
                                    </td>
                                    <td className="px-4 sm:px-6 py-4">
                                        <div className="h-4 w-16 bg-gray-300 dark:bg-gray-700 rounded animate-pulse"></div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }

    if (isError) {
        return <p className="text-center text-red-500">Failed to load teachers.</p>;
    }

    const filteredTeachers = teachers.filter((teacher) => {
        const search = selector.toLowerCase().trim();
        return (
            teacher.username?.toLowerCase().includes(search) ||
            teacher.email?.toLowerCase().includes(search) ||
            teacher.phone?.toLowerCase().includes(search)
        );
    });

    return (
        <div className="min-h-screen p-4 sm:p-6 bg-gradient-to-br from-white via-blue-100 to-blue-500 dark:from-gray-900 dark:via-black dark:to-emerald-900">
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
                    }}
                    className="w-full sm:w-1/3 px-3 py-2 rounded-lg bg-white text-gray-900 border border-sky-300 focus:outline-none focus:ring-2 focus:ring-sky-500 dark:bg-gray-800 dark:text-emerald-200 dark:border-emerald-600"
                />
                <button className="w-full sm:w-auto bg-sky-600 text-white px-4 py-2 rounded-lg hover:bg-sky-700">
                    + Add Teacher
                </button>
            </div>

            {/* Teacher Table */}
            <div className="bg-white/40 dark:bg-black/40 backdrop-blur-md border border-sky-200 dark:border-emerald-600 shadow-md rounded-lg overflow-x-auto w-full sm:w-11/12 md:w-4/5 mx-auto">
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
                                Phone
                            </th>
                            <th className="px-4 sm:px-6 py-3 text-left font-semibold text-sky-900 dark:text-emerald-200">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredTeachers.map((teacher) => (
                            <tr
                                key={teacher._id}
                                className="border-t border-sky-200 dark:border-emerald-600 hover:bg-sky-50 dark:hover:bg-gray-700 transition"
                            >
                                <td className="px-4 sm:px-6 py-4 text-sky-900 dark:text-emerald-200">
                                    {teacher.username}
                                </td>
                                <td className="px-4 sm:px-6 py-4 text-gray-700 dark:text-gray-300">
                                    {teacher.email}
                                </td>
                                <td className="px-4 sm:px-6 py-4 text-gray-700 dark:text-gray-300">
                                    {teacher.phone || "N/A"}
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