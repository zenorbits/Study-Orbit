import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"


export const profileSettingApi = createApi({
    reducerPath: 'profileSettingApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://study-orbit-backend.onrender.com/api/profile', credentials: 'include' }),
    endpoints: (build) => ({
        deleteProfile: build.mutation({
            query: () => ({
                url: '/deleteprofile',
                method: 'DELETE'
            })
        }),
        editProfile: build.mutation({
            query: (updatedData) => ({
                url:'/editprofile',
                method:'PATCH',
                body:updatedData
            })
        })
    })
})

export const { useDeleteProfileMutation } = profileSettingApi