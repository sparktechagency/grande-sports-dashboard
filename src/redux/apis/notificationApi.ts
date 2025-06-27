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
  }),
})

export const { useGetNotificationsQuery } = notificationApi;