import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://study-orbit-backend.onrender.com/api/user', credentials: 'include' }),
    endpoints: (build) => ({
        fetchStudentCount: build.query({
            query: () => ({
                url: '/students',
                method: 'GET'
            })
        }),
        fetchTeacher: build.query({
            query: () => ({
                url: '/teachers',
                method: 'GET'
            })
        }),
        fetchProfileInfo: build.query({
            query: () => ({
                url: '/profileinfo',
                method: 'GET'
            })
        })
    })
});

export const { useFetchStudentCountQuery, useFetchTeacherQuery, useFetchProfileInfoQuery } = userApi;