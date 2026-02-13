import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const otpApi = createApi({
    reducerPath: 'otpApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://study-orbit-backend.onrender.com/api/auth/user',credentials:'include' }),
    endpoints: (build) => ({
        verifyOtp: build.mutation({
            query: (otp) => ({
                url: '/verify-otp',
                method: 'POST',
                body:{otp}
            })
        })
    })
});

export const { useVerifyOtpMutation } = otpApi