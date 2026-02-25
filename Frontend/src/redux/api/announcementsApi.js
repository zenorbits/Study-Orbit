import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const announcementApi = createApi({
    reducerPath: 'announcementApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://study-orbit-backend.onrender.com/api/announcements', credentials: 'include' }),
    endpoints: (build) => ({
        createAnnouncement: build.mutation({
            query: ({ title, message }) => ({
                url: '/createannouncement',
                method: 'POST',
                body: { title, message }
            })
        }),
        getAnnouncements: build.query({
            query: () => ({
                url: '/getannouncement',
                method: 'GET'
            })
        })
    })
})

export const { useCreateAnnouncementMutation,useGetAnnouncementsQuery } = announcementApi;