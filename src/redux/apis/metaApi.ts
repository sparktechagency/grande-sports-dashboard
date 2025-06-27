import { baseApi } from "./baseApi";

const metaApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMetaData: builder.query({
      query: (params) => ({
        url: "/meta",
        method: "GET",
        params
      }),
      providesTags: ["meta"]
    }),

  }),
})

export const { useGetMetaDataQuery } = metaApi;