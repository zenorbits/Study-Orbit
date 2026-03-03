import React, { useState, useEffect } from 'react';
import {
    useCreateAssignmentMutation,
    useGetAssignmentsQuery,
    useDeleteAssignmentMutation
} from '../redux/api/assignmentsApi';
import { toast } from "react-toastify";
import { useGetVerifiedBatchQuery } from '../redux/api/batchApi';

const AssignmentPage = ({ role }) => {
    const [showForm, setShowForm] = useState(false);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [dueDate, setDueDate] = useState("");
    const [selectedBatchId, setSelectedBatchId] = useState("");

    // Get all verified batches for the user
    const { data: batchData } = useGetVerifiedBatchQuery();
    const verifiedBatches = batchData?.batches || [];

    // Default to the first batch if available
    useEffect(() => {
        if (verifiedBatches.length > 0 && !selectedBatchId) {
            setSelectedBatchId(verifiedBatches[0]._id);
        }
    }, [verifiedBatches, selectedBatchId]);

    const [createAssignment, { isLoading }] = useCreateAssignmentMutation();
    const { data, isLoading: loadingAssignments, refetch } = useGetAssignmentsQuery(selectedBatchId, {
        skip: !selectedBatchId
    });
    const [deleteAssignment] = useDeleteAssignmentMutation();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createAssignment({ batchId: selectedBatchId, title, description, dueDate }).unwrap();
            toast.success("✅ Assignment created successfully!");
            setShowForm(false);
            setTitle("");
            setDescription("");
            setDueDate("");
            refetch();
        } catch (error) {
            toast.error(error?.data?.message || "❌ Failed to create assignment");
        }
    };

    return (
        <div className="min-h-[80vh] w-full font-mono p-10
      bg-gradient-to-br from-white via-blue-100 to-blue-500
      dark:from-gray-900 dark:via-black dark:to-emerald-900
      text-gray-900 dark:text-white">

            <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-bold">📚 Assignments</h1>
                {(role === "admin" || role === "teacher") && (
                    <button
                        onClick={refetch}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md shadow-md 
            hover:bg-blue-700 transition-transform transform hover:scale-105"
                    >
                        🔄 Refresh
                    </button>
                )}
            </div>

            {loadingAssignments && <p>Loading assignments...</p>}
            {data?.data?.length === 0 && <p>No assignments for this batch</p>}
            {data?.data?.map((a) => (
                <div key={a._id} className="border rounded-lg p-6 mb-6 shadow-lg flex items-center justify-between">
                    <div>
                        <h2 className="text-xl font-semibold mb-2">{a.title}</h2>
                        <p>{a.description}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                            📅 Due: {new Date(a.dueDate).toLocaleDateString()}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            👤 Created by: {a.createdBy?.name || "Unknown"}
                        </p>
                    </div>

                    {(role === "admin" || role === "teacher") && (
                        <button
                            onClick={async () => {
                                const confirmed = window.confirm("Are you sure you want to delete this assignment?");
                                if (!confirmed) return;
                                try {
                                    await deleteAssignment(a._id).unwrap();
                                    toast.success("🗑 Assignment deleted successfully!");
                                    refetch();
                                } catch (err) {
                                    toast.error(err?.data?.message || "❌ Failed to delete assignment");
                                }
                            }}
                            className="ml-auto px-4 py-2 flex items-center gap-2 
              bg-gradient-to-r from-red-600 to-red-700 
              text-white font-semibold rounded-md shadow-md 
              hover:from-red-700 hover:to-red-800 
              transition-transform transform hover:scale-105"
                        >
                            🗑 <span>Delete</span>
                        </button>
                    )}
                </div>
            ))}

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
                            {/* Batch selector inside the form */}
                            {verifiedBatches.length > 0 && (
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
                            )}

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
                                disabled={isLoading}
                                className="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700
                dark:bg-emerald-500 dark:hover:bg-emerald-600 transition disabled:opacity-50"
                            >
                                {isLoading ? "Submitting..." : "Submit"}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AssignmentPage;