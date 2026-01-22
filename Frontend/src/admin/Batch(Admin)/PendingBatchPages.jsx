import React, { useState } from "react";
import { toast } from "react-toastify";
import { useGetPendingBatchQuery, useUpdateBatchStatusMutation } from "../../redux/api/batchApi";

const PendingBatchPages = () => {
  const [decisions, setDecisions] = useState({});
  const { data, isLoading, refetch } = useGetPendingBatchQuery();
  const [updateBatchStatus] = useUpdateBatchStatusMutation();

  const batches = data?.batches || [];

  // Better loading UI
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-blue-100 to-blue-500 dark:from-gray-900 dark:via-black dark:to-emerald-900">
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-lg font-semibold text-gray-700 dark:text-gray-200">
            Loading pending batches...
          </p>
        </div>
      </div>
    );
  }

  const handleDecisionChange = (id, value) => {
    setDecisions((prev) => ({ ...prev, [id]: value }));
  };

  const handleConfirm = async (id) => {
    const decision = decisions[id];
    if (!decision) {
      toast.warn("⚠️ Please select an action before confirming.");
      return;
    }

    setDecisions((prev) => ({ ...prev, [id]: decision }));

    try {
      await updateBatchStatus({ id, status: decision }).unwrap();

      if (decision === "Verified") {
        toast.success(`✅ Batch ${id} has been marked as Verified`);
        refetch();
      } else {
        toast.error(`❌ Batch ${id} has been marked as Rejected`);
        refetch();
      }
    } catch (err) {
      toast.error("❌ Failed to update batch status");
      console.error("Update error:", err);
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center py-10 
      bg-gradient-to-br from-white via-blue-100 to-blue-500 
      dark:from-gray-900 dark:via-black dark:to-emerald-900"
    >
      <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-8">
        Pending Batches
      </h1>

      {/* Show message if no batches */}
      {batches.length === 0 ? (
        <p className="text-lg font-semibold text-gray-600 dark:text-gray-300">
          🎉 No pending batches at the moment!
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-11/12 md:w-4/5">
          {batches.map((batch, index) => (
            <div
              key={batch.id || batch._id || index}
              className="rounded-lg shadow-md p-6 bg-white/80 dark:bg-gray-800/80 
                text-gray-800 dark:text-gray-100 font-semibold border border-yellow-400 
                hover:shadow-lg transition flex flex-col h-full"
            >
              <div className="flex-grow">
                <h2 className="text-lg font-bold mb-2">{batch.batchname}</h2>
                <p className="text-sm opacity-80">Code: {batch.code}</p>
                <p className="text-sm opacity-80">Created By: {batch.createdBy}</p>
                <p className="text-sm opacity-80">Description: {batch.description}</p>
                <p className="text-sm opacity-80">Status: {batch.status}</p>
              </div>

              <div className="mt-3">
                <select
                  value={decisions[batch.id || batch._id] || ""}
                  onChange={(e) =>
                    handleDecisionChange(batch.id || batch._id, e.target.value)
                  }
                  className="w-full p-2 rounded-md border border-gray-300 dark:border-gray-600 
                    bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 text-sm"
                >
                  <option value="">Select Action</option>
                  <option value="Verified">✅ Verified</option>
                  <option value="Rejected">❌ Rejected</option>
                </select>
              </div>

              <button
                onClick={() => handleConfirm(batch.id || batch._id)}
                className="mt-3 w-full py-2 rounded-md bg-blue-500 text-white 
                  font-semibold hover:bg-blue-600 transition"
              >
                Confirm
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PendingBatchPages;