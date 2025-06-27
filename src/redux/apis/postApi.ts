import { baseApi } from "./baseApi";

const postApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createPost: builder.mutation({
      query: (payload) => ({
        url: "/community-posts",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["post"]
    }),
    getAllPosts: builder.query({
      query: (params) => ({
        url: "/community-posts",
        method: "GET",
        params,
      }),
      providesTags: ["post"]
    }),
    getMyPosts: builder.query({
      query: (params) => ({
        url: "/community-posts/my-community-posts",
        method: "GET",
        params,
      }),
      providesTags: ["post"]
    }),
    getSinglePost: builder.query({
      query: (id) => ({
        url: `/community-posts/${id}`,
        method: "GET",
      }),
      providesTags: ["post"]
    }),
    updatePost: builder.mutation({
      query: ({ id, payload }) => ({
        url: `/community-posts/${id}`,
        method: "PUT",
        body: payload
      }),
      invalidatesTags: ["post"]
    }),
    deletePost: builder.mutation({
      query: (id) => ({
        url: `/community-posts/${id}`,
        method: "DELETE"
      }),
      invalidatesTags: ["post"]
    }),
  }),
})

export const { useCreatePostMutation, useGetAllPostsQuery, useGetMyPostsQuery, useGetSinglePostQuery, useUpdatePostMutation, useDeletePostMutation } = postApi;