import { baseApi } from "./baseApi";

const messageApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMyMessages: builder.query({
      query: (id) => ({
        url: `/messages/my-messages/${id}`,
        method: "GET",
      }),
      providesTags: ["messages"]
    }),
    sendMessage: builder.mutation({
      query: (payload) => ({
        url: `/messages/send-messages`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["messages"]
    }),
    seenMessageByChatId: builder.mutation({
      query: (id) => ({
        url: `/messages/seen/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["chats", "messages"]
    }),
    deleteChat: builder.mutation({
      query: (chatId) => ({
        url: `/messages/chat/${chatId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["messages", "chats"]
    }),
  }),
})

export const { useGetMyMessagesQuery, useSendMessageMutation, useSeenMessageByChatIdMutation, useDeleteChatMutation } = messageApi;