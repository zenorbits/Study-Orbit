import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const batchApi = createApi({
    reducerPath: 'batchApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/api/batch', credentials: 'include' }),
    endpoints: (build) => ({
        batchCreation: build.mutation({
            query: (info) => ({
                url: '/create',
                method: 'POST',
                body: info
            })
        }),
        getBatchForTeacher: build.query({
            query: () => ({
                url: '/allforTeacherbatch',
                method: 'GET'
            })
        }),
        getPendingBatch: build.query({
            query: () => ({
                url: '/pendingbatches',
                method: 'GET'
            })
        })
    })

})


export const { useBatchCreationMutation, useGetBatchForTeacherQuery,useGetPendingBatchQuery } = batchApi
