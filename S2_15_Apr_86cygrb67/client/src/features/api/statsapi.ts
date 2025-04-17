
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const statsApi = createApi({
  reducerPath: "statsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/stats",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      console.log("Token:", token); 
      if (token) headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getTotalPosts: builder.query<{ totalPosts: number }, void>({
      query: () => "total-posts",
    }),
    getTotalCategories: builder.query<{ totalCategories: number }, void>({
      query: () => "total-categories",
    }),
    getTotalUsers: builder.query<{ totalUsers: number }, void>({
      query: () => "total-users",
    }),
  }),
});

export const {
  useGetTotalPostsQuery,
  useGetTotalCategoriesQuery,
  useGetTotalUsersQuery,
} = statsApi;
