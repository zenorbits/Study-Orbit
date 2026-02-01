import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"


export const profileSettingApi = createApi({
    reducerPath: 'profileSettingApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://study-orbit-backend.onrender.com/api/profile' }),
    endpoints: (build) => ({
        deleteProfile: build.mutation({
            query: () => ({
                url: '/deleteprofile',
                method: 'DELETE'
            })
        })
    })
})

export const { useDeleteProfileMutation } = profileSettingApi