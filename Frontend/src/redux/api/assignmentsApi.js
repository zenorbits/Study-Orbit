import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const assignmentApi = createApi({
    reducerPath: 'assignmentApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://study-orbit-backend.onrender.com/api/assignment', credentials: 'include' }),
    endpoints: (build) => ({
        createAssignment: build.mutation({
            query: ({ title, description, dueDate }) => ({
                url: '/createAssignment',
                method: 'POST',
                body: { title, description, dueDate },
            })
        }),
        getAssignment: build.query({
            query: () => ({
                url: 'getassignment',
                method: 'GET'
            })
        })  
    })
});

export const { useCreateAssignmentMutation, useGetAssignmentQuery } = assignmentApi;