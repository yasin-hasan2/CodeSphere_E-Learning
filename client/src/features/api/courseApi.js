import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const COURSE_API_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:6001/api/v1/course/"
    : "https://codesphere-lms.onrender.com/api/v1/course/";

export const courseApi = createApi({
  reducerPath: "courseApi",
  tagTypes: ["Refetch_Creator_Courses", "Refetch_Lectures"], // add tag type here for refetching your data after mutation and it works again and again when you do mutation
  baseQuery: fetchBaseQuery({
    baseUrl: COURSE_API_URL,
    credentials: "include",
  }) /* your base query here */,
  endpoints: (builder) => ({
    createCourse: builder.mutation({
      query: ({ courseTitle, category }) => ({
        url: "",
        method: "POST",
        body: { courseTitle, category },
      }),
      invalidatesTags: ["Refetch_Creator_Courses"], // invalidating the tag to refetch the data
    }),
    searchCourses: builder.query({
      query: ({ searchQuery, category, sortByPrice }) => {
        let queryString = `/search?query=${encodeURIComponent(searchQuery)}`;
        // Append category only if it's provided
        if (category && category.length > 0) {
          const categoriesString = category
            .map((cat) => encodeURIComponent(cat))
            .join(",");
          queryString += `&category=${categoriesString}`;
        }
        // Append sortByPrice only if it's provided
        if (sortByPrice) {
          queryString += `&sortByPrice=${encodeURIComponent(sortByPrice)}`;
        }
        return {
          url: queryString,
          method: "GET",
        };
      },
      providesTags: ["Refetch_Creator_Courses"],
    }),
    getPublishedCourses: builder.query({
      query: () => ({
        url: "/published-courses",
        method: "GET",
      }),
      providesTags: ["Refetch_Creator_Courses"],
    }),
    getCreatorCourse: builder.query({
      query: () => ({
        url: "",
        method: "GET",
      }),
      providesTags: ["Refetch_Creator_Courses"], // providing the tag to refetch the data
    }),
    editCourse: builder.mutation({
      query: ({ formData, courseId }) => ({
        url: `/${courseId}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["Refetch_Creator_Courses"], // invalidating the tag to refetch the data
    }),
    getCourseById: builder.query({
      query: (courseId) => ({
        url: `/${courseId}`,
        method: "GET",
      }),
      providesTags: ["Refetch_Creator_Courses"], // providing the tag to refetch the data
    }),
    createLecture: builder.mutation({
      query: ({ courseId, lectureTitle }) => ({
        url: `/${courseId}/lecture`,
        method: "POST",
        body: { lectureTitle },
      }),
    }),
    getCourseLecture: builder.query({
      query: (courseId) => ({
        url: `/${courseId}/lecture`,
        method: "GET",
      }),
      providesTags: ["Refetch_Lectures"],
    }),
    editLecture: builder.mutation({
      query: ({
        courseId,
        lectureId,
        lectureTitle,
        videoInfo,
        isPreviewFree,
      }) => ({
        url: `/${courseId}/lecture/${lectureId}`,
        method: "POST",
        body: { lectureTitle, videoInfo, isPreviewFree },
      }),
    }),
    removeLecture: builder.mutation({
      query: (lectureId) => ({
        url: `/lecture/${lectureId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Refetch_Lectures"],
    }),
    getLectureById: builder.query({
      query: (lectureId) => ({
        url: `/lecture/${lectureId}`,
        method: "GET",
      }),
      providesTags: ["Refetch_Lectures"],
    }),
    publishCourse: builder.mutation({
      query: ({ courseId, query }) => ({
        url: `/${courseId}?publish=${query}`,
        method: "PATCH",
        // body: { publish }, // Include body if needed
      }),
      // invalidatesTags: ["Refetch_Creator_Courses"],
    }),
  }),
});

export const {
  useCreateCourseMutation,
  useSearchCoursesQuery,
  useGetPublishedCoursesQuery,
  useGetCreatorCourseQuery,
  useEditCourseMutation,
  useGetCourseByIdQuery,
  useCreateLectureMutation,
  useGetCourseLectureQuery,
  useEditLectureMutation,
  useRemoveLectureMutation,
  useGetLectureByIdQuery,
  usePublishCourseMutation,
} = courseApi;

// This code is the short form of search query builder
//  url: `/search?query=${encodeURIComponent(
//           searchQuery
//         )}&category=${encodeURIComponent(
//           category
//         )}&sortByPrice=${encodeURIComponent(sortByPrice)}`,
