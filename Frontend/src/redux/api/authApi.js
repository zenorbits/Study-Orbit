import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/api/auth/user' }),
    endpoints: (build) => ({
        userRegister: build.mutation({
            query: (userData) => ({
                url: '/register',
                method: 'POST',
                body: userData
            })
        }),
        userLogin: build.mutation({
            query: (credentials) => ({
                url: '/login',
                method: 'POST',
                body: credentials
            })
        }),
        userLogout: build.mutation({
            query: () => ({
                url: '/logout',
                method: 'POST'
            })
        })
    })
});


const { useUserRegisterMutation, useUserLoginMutation, useUserLogoutMutation } = authApi