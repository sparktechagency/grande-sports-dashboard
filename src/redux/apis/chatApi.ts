import { baseApi } from "./baseApi";

const chatApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMyChats: builder.query({
      query: () => ({
        url: "/chats/my-chat-list",
        method: "GET",
      }),
      providesTags: ["chats"]
    }),
    getSingleChat: builder.query({
      query: (id) => ({
        url: `/chats/${id}`,
        method: "GET"
      }),
      providesTags: ["chats"]
    }),
  }),
})

export const { useGetMyChatsQuery, useGetSingleChatQuery } = chatApi;