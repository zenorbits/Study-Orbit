import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
    reducerPath:'userApi',
    baseQuery:fetchBaseQuery({baseUrl:'http://localhost:3000/api/user',credentials:'include'}),
    endpoints:(build)=>({
        fetchStudentCount:build.query({
            query:()=>({
                url:'/students',
                method:'GET'
            })
        })
    })
});

const {useFetchStudentCountQuery} = userApi;