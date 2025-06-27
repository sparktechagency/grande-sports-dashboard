import { baseApi } from "./baseApi";

const videoApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addVideo: builder.mutation({
      query: (formData) => ({
        url: "/service-videos",
        method: "POST",
        body: formData,
        // ✅ skip setting headers — browser handles it for FormData
      }),
      invalidatesTags: ["videos"]
    }),

    getVideos: builder.query({
      query: (params) => ({
        url: "/service-videos",
        method: "GET",
        params
      }),
      providesTags: ["videos"]
    }),
    getVideo: builder.query({
      query: (id) => ({
        url: `/service-videos/${id}`,
        method: "GET",
      }),
      providesTags: ["videos"]
    }),
    getPlaylistVideos: builder.query({
      query: ({ playlistId, ...params }) => ({
        url: `/service-videos/playlist/${playlistId}`,
        method: "GET",
        params
      }),
      providesTags: ["videos"]
    }),
    updateVideo: builder.mutation({
      query: ({ id, payload }) => ({
        url: `/service-videos/${id}`,
        method: "PUT",
        body: payload
      }),
      invalidatesTags: ["videos"]
    }),
    deleteVideo: builder.mutation({
      query: (id) => ({
        url: `/service-videos/${id}`,
        method: "DELETE"
      }),
      invalidatesTags: ["videos"]
    }),
  }),
})

export const { useAddVideoMutation, useGetVideosQuery, useGetVideoQuery, useGetPlaylistVideosQuery, useUpdateVideoMutation, useDeleteVideoMutation } = videoApi;