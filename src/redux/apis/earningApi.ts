import { baseApi } from "./baseApi";

const earningApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllEarnings: builder.query({
      query: (params) => ({
        url: "/payments/dashboard-data",
        method: "GET",
        params
      }),
      providesTags: ["payments"]
    }),

  }),
})

export const { useGetAllEarningsQuery } = earningApi;