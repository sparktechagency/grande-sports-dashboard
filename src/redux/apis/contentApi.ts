import { baseApi } from "./baseApi";

const contentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getContents: builder.query({
      query: () => ({
        url: "/contents",
        method: "GET",
      }),
      providesTags: ["contents"]
    }),
    updateContents: builder.mutation({
      query: (payload) => ({
        url: "/contents",
        method: "PUT",
        body: payload
      }),
      invalidatesTags: ["contents"]
    }),
  }),
})

export const { useGetContentsQuery, useUpdateContentsMutation } = contentApi;