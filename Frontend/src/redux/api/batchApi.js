import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const batchApi = createApi({
    reducerPath: 'batchApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://study-orbit-backend.onrender.com/api/batch', credentials: 'include' }),
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
        }),
        updateBatchStatus: build.mutation({
            query: ({ id, status }) => ({
                url: `/${id}/status`,
                method: 'PATCH',
                body: { status }
            })
        }),
        getVerifiedBatch: build.query({
            query: () => ({
                url: '/verifiedbatches',
                method: 'GET'
            })
        }),
        joinBatch: build.mutation({
            query: ({ batchId, batchCode }) => ({
                url: '/joinbatch',
                method: 'POST',
                body: { batchId, batchCode }
            })
        }),
        fetchJoinedBatch: build.query({
            query: () => ({
                url: '/joinedbatches',
                method: 'GET'
            })
        }),
        deleteBatch: build.mutation({
            query: (id) => ({
                url: `/deletebatch/${id}`,
                method: 'DELETE'
            })
        })
    })

})


export const { useBatchCreationMutation, useGetBatchForTeacherQuery, useGetPendingBatchQuery, useUpdateBatchStatusMutation, useGetVerifiedBatchQuery, useJoinBatchMutation, useFetchJoinedBatchQuery, useDeleteBatchMutation } = batchApi
