import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const assignmentApi = createApi({
    reducerPath: 'assignmentApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://study-orbit-backend.onrender.com/api/assignment', credentials: 'include' }),
    endpoints: (build) => ({
        createAssignment: build.mutation({
            query: ({ title, description, dueDate, batchId }) => ({
                url: `/${id}/createAssignment`,
                method: 'POST',
                body: { title, description, dueDate, batchId },
            })
        }),
        getAssignments: build.query({
            query: () => ({
                url: '/getassignment',
                method: 'GET'
            })
        }),
        deleteAssignment: build.mutation({
            query: (id) => ({
                url: '/deleteassignment',
                method: 'DELETE',
                body: { id }
            })
        })
    })
});

export const { useCreateAssignmentMutation, useGetAssignmentsQuery, useDeleteAssignmentMutation } = assignmentApi;