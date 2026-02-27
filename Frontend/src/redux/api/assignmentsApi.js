const { createApi, fetchBaseQuery } = require("@reduxjs/toolkit/query/react");


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
        })
    })
});

export const { useCreateAssignmentMutation } = assignmentApi;