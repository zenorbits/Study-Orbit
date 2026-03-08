import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const attendanceApi = createApi({
  reducerPath: "attendanceApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://study-orbit-backend.onrender.com/api/attendance",
    credentials: "include"
  }),
  endpoints: (build) => ({
    markAttendance: build.mutation({
      query: ({ batchId, records, date }) => ({
        url: `/batch/${batchId}`,
        method: "POST",
        body: { records, date }   // ✅ include date
      })
    }),
    getStudentAttendance: build.query({
      query: (studentId) => `/student/${studentId}` // for percentage
    })
  })
});

export const { useMarkAttendanceMutation, useGetStudentAttendanceQuery } = attendanceApi;