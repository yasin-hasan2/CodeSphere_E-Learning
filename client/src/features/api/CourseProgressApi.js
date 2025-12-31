import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const COURSE_PROGRESS_API =
  import.meta.env.MODE === "development"
    ? "http://localhost:6001/api/v1/course-progress/"
    : "https://codesphere-lms.onrender.com/api/v1/course-progress/";

// const COURSE_PROGRESS_API = "http://localhost:6001/api/v1/course-progress/";

export const courseProgressApi = createApi({
  reducerPath: "courseProgressApi",
  baseQuery: fetchBaseQuery({
    baseUrl: COURSE_PROGRESS_API,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    getCourseProgress: builder.query({
      query: (courseId) => ({
        url: `/${courseId}`,
        method: "GET",
      }),
    }),
    updateLectureProgress: builder.mutation({
      query: ({ courseId, lectureId, viewed }) => ({
        url: `/${courseId}/lecture/${lectureId}/view`,
        method: "POST",
        body: { viewed },
      }),
    }),
    markCourseAsCompleted: builder.mutation({
      query: (courseId) => ({
        url: `/${courseId}/complete`,
        method: "POST",
      }),
    }),
    markCourseAsInComplete: builder.mutation({
      query: (courseId) => ({
        url: `/${courseId}/incomplete`,
        method: "POST",
      }),
    }),
  }),
});

export const {
  useGetCourseProgressQuery,
  useUpdateLectureProgressMutation,
  useMarkCourseAsCompletedMutation,
  useMarkCourseAsInCompleteMutation,
} = courseProgressApi;
