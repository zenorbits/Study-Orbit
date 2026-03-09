import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const assignmentApi = createApi({
    reducerPath: "assignmentApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://study-orbit-backend.onrender.com/api/assignment",
        credentials: "include",
    }),
    endpoints: (build) => ({
        // ✅ Create assignment
        createAssignment: build.mutation({
            query: ({ title, description, dueDate, batchId }) => ({
                url: `/${batchId}/createAssignment`,
                method: "POST",
                body: { title, description, dueDate, batchId },
            }),
        }),

        // ✅ Get all assignments
        getAssignments: build.query({
            query: () => ({
                url: "/getassignment",
                method: "GET",
            }),
        }),

        // ✅ Delete assignment
        deleteAssignment: build.mutation({
            query: (id) => ({
                url: "/deleteassignment",
                method: "DELETE",
                body: { id },
            }),
        }),

        // ✅ New: Get assignments by batch ID
        getAssignmentsByBatch: build.query({
            query: (batchId) => ({
                url: `${batchId}/batchassignment`, // matches your new backend route
                method: "GET",
            }),
        }),
    }),
});

// Export hooks
export const {
    useCreateAssignmentMutation,
    useGetAssignmentsQuery,
    useDeleteAssignmentMutation,
    useGetAssignmentsByBatchQuery, // new hook
} = assignmentApi;