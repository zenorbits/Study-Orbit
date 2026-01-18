import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const batchApi = createApi({
    reducerPath: 'batchApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/api/batch' }),
    endpoints: (build) => ({
        batchCreation: build.mutation({
            query: (info) => ({
                url: '/create',
                method: 'POST',
                body: info
            })
        })
    })
})


const { useBatchCreationMutation } = batchApi
