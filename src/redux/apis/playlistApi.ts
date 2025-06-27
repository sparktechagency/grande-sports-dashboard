import { baseApi } from "./baseApi";

const playlistApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createPlaylist: builder.mutation({
      query: (payload) => ({
        url: "/playlists",
        method: "POST",
        body: payload
      }),
      invalidatesTags: ["playlists"]
    }),
    getPlaylists: builder.query({
      query: (params) => ({
        url: "/playlists",
        method: "GET",
        params
      }),
      providesTags: ["playlists"]
    }),
    getPlaylist: builder.query({
      query: (id) => ({
        url: `/playlists/${id}`,
        method: "GET",
      }),
      providesTags: ["playlists"]
    }),
    getAllPlaylistVideos: builder.query({
      query: (params) => ({
        url: "/playlists/service-video-playlist",
        method: "GET",
        params
      }),
      providesTags: ["playlists"]
    }),
    updatePlaylist: builder.mutation({
      query: ({ id, payload }) => ({
        url: `/playlists/${id}`,
        method: "PUT",
        body: payload
      }),
      invalidatesTags: ["playlists"]
    }),
    deletePlaylist: builder.mutation({
      query: (id) => ({
        url: `/playlists/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["playlists"]
    }),
  }),
})

export const { useCreatePlaylistMutation, useGetPlaylistsQuery, useGetAllPlaylistVideosQuery, useGetPlaylistQuery, useUpdatePlaylistMutation, useDeletePlaylistMutation } = playlistApi;