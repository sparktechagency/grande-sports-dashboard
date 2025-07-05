import { baseApi } from "./baseApi";

const notificationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getNotifications: builder.query({
      query: (params) => ({
        url: "/notification",
        method: "GET",
        params
      }),
      providesTags: ["notification"]
    }),
    deleteAllNotifications: builder.mutation({
      query: () => ({
        url: "/notification/my-notifications",
        method: "DELETE"
      }),
      invalidatesTags: ["notification"]
    }),
  }),
})

export const { useGetNotificationsQuery, useDeleteAllNotificationsMutation } = notificationApi;