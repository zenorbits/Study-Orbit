import React, { useState } from 'react';

const AssignmentPage = ({ role }) => {
    const [showForm, setShowForm] = useState(false);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [dueDate, setDueDate] = useState("");
    const [createAssignment] = usecreateAss

    const handleSubmit = (e) => {
        e.preventDefault();
        // Later: connect to backend with RTK Query mutation
        console.log({ title, description, dueDate });
        setShowForm(false);
        setTitle("");
        setDescription("");
        setDueDate("");
    };

    return (
        <div
            className="min-h-[80vh] w-full font-mono p-10
        bg-gradient-to-br from-white via-blue-100 to-blue-500
        dark:from-gray-900 dark:via-black dark:to-emerald-900
        text-gray-900 dark:text-white"
        >
            <h1 className="text-3xl font-bold mb-8">📚 Assignments</h1>

            {/* Example assignment card */}
            <div className="border rounded-lg p-6 mb-6 shadow-lg">
                <h2 className="text-xl font-semibold mb-2">Science Project</h2>
                <p>Prepare a model of the solar system</p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                    📅 Due: 5 March 2026
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                    👤 Created by: Teacher A
                </p>
            </div>

            {(role === "admin" || role === "teacher") && (
                <button
                    onClick={() => setShowForm(true)}
                    className="mt-6 px-5 py-2 bg-emerald-600 text-white rounded-md
            hover:bg-emerald-700 transition shadow-md
            dark:bg-emerald-500 dark:hover:bg-emerald-600"
                >
                    ➕ Add Assignment
                </button>
            )}

            {showForm && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-11/12 md:w-2/3 lg:w-1/2 p-6 relative">
                        <button
                            onClick={() => setShowForm(false)}
                            className="absolute top-3 right-3 text-gray-600 dark:text-gray-300 hover:text-red-500"
                        >
                            ❌
                        </button>

                        <h2 className="text-2xl font-bold mb-4">Add New Assignment</h2>

                        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                            <input
                                type="text"
                                placeholder="Title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="p-2 rounded-md border border-gray-300 dark:border-gray-600
                  bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
                            />
                            <textarea
                                placeholder="Description"
                                rows="4"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="p-2 rounded-md border border-gray-300 dark:border-gray-600
                  bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
                            ></textarea>
                            <input
                                type="date"
                                value={dueDate}
                                onChange={(e) => setDueDate(e.target.value)}
                                className="p-2 rounded-md border border-gray-300 dark:border-gray-600
                  bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
                            />
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

export default AssignmentPage;