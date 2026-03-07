import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const attendanceApi = createApi({
  reducerPath: "attendanceApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://study-orbit-backend.onrender.com/api/attendance",
    credentials: "include"
  }),
  endpoints: (build) => ({
    markAttendance: build.mutation({
      query: ({ batchId, records }) => ({
        url: `/batch/${batchId}`,   // ✅ matches backend route
        method: "POST",
        body: { records }           // ✅ send array of { studentId, status }
      })
    }),
    getStudentAttendance: build.query({
      query: (studentId) => `/student/${studentId}` // for percentage
    })
  })
});

export const { useMarkAttendanceMutation, useGetStudentAttendanceQuery } = attendanceApi;