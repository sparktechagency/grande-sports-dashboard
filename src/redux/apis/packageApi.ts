import { baseApi } from "./baseApi";

const packageApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addPackage: builder.mutation({
      query: (payload) => ({
        url: "/packages",
        method: "POST",
        body: payload
      }),
      invalidatesTags: ["packages"]
    }),
    getAllPackages: builder.query({
      query: (params) => ({
        url: "/packages",
        method: "GET",
        params
      }),
      providesTags: ["packages"]
    }),
    getSingePackage: builder.query({
      query: (id) => ({
        url: `/packages/${id}`,
        method: "GET"
      }),
      providesTags: ["packages"]
    }),
    updatePackage: builder.mutation({
      query: ({ id, payload }) => ({
        url: `/packages/${id}`,
        method: "PUT",
        body: payload
      }),
      invalidatesTags: ["packages"]
    }),
    deletePackage: builder.mutation({
      query: (id) => ({
        url: `/packages/${id}`,
        method: "DELETE"
      }),
      invalidatesTags: ["packages"]
    }),
    giftSubscription: builder.mutation({
      query: (payload) => ({
        url: `/subscriptions/gift`,
        method: "POST",
        body: payload
      }),
      invalidatesTags: ["subscriptions"]
    }),
  }),
})

export const { useAddPackageMutation, useGetAllPackagesQuery, useGetSingePackageQuery, useUpdatePackageMutation, useDeletePackageMutation , useGiftSubscriptionMutation} = packageApi;