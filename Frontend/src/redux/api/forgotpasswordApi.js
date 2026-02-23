import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const forgotPasswordApi = createApi({
    reducerPath:'forgotPasswordApi',
    baseQuery:fetchBaseQuery({baseUrl:'',credentials:'include'})
})