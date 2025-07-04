import { baseApi } from "./baseApi";

const chatApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMyChats: builder.query({
      query: () => ({
        url: "/chats/my-chat-list",
        method: "GET",
      }),
    }),
    getSingleChat: builder.query({
      query: (id) => ({
        url: `/chats/${id}`,
        method: "GET"
      }),
    }),
  }),
})

export const { useGetMyChatsQuery, useGetSingleChatQuery } = chatApi;