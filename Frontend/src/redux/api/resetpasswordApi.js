import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const resetPasswordApi = createApi({
    reducerPath: 'forgotPasswordApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://study-orbit-backend.onrender.com/api/password', credentials: 'include' }),
    endpoints:(build)=>({
        forgotPassword:build.mutation({
            query:(email)=>({
                url:'/forgotpassword',
                method:'POST',
                body:email
            })
        })
    })
});

export const {useForgotPasswordMutation} = resetPasswordApi;