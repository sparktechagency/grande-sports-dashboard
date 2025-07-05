"use client"

import { Input } from "antd"
import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { useGetMyChatsQuery } from "@/redux/apis/chatApi"
import Spinner from "@/components/skeletons/Spinner"
import ErrorComponent from "@/components/skeletons/ErrorComponent"
import MessagesBox from "./MessageBox"
import { useSeenMessageByChatIdMutation } from "@/redux/apis/messageApi"
import handleMutation from "@/utils/handleMutation"
import ChatCard from "./ChatCard"
import io from "socket.io-client"

const { Search } = Input

const MessageContainer = () => {
  const params = useSearchParams()
  const router = useRouter()
  const [activeChat, setActiveChat] = useState(0)
  const [seenMessages] = useSeenMessageByChatIdMutation()
  useEffect(() => {
    const activeChat = params.get("activeChat")
    setActiveChat(Number(activeChat))
  }, [params])

  // fetch my chats
  const { data, isLoading, isError, error, refetch } = useGetMyChatsQuery("")
  const chats = data?.data || []
  const handleChangeActiveChat = (idx: number) => {
    router.push(`/message?activeChat=${idx}`)
    setActiveChat(idx)

    // mark messages as seen when chat is opened
    const chatId = data?.data[idx]?.chat?._id
    handleMutation(chatId, seenMessages, undefined, () => {
      refetch()
    })
  }

  useEffect(() => {
    const activeChat = params.get("activeChat")
    setActiveChat(Number(activeChat) || 0)
  }, [params])

  useEffect(() => {
    window.socket = io("http://172.252.13.74:4003/")
    window.socket.on("chat-list::67d90dc0d0708e836727e403", (newMessages) => {
      console.log("Received messages via Socket.IO:", newMessages)
    })
    window.socket.on("connect_error", (error) => {
      console.error("Socket.IO connection error:", error)
    })
    return () => {
      window.socket?.disconnect()
    }
  }, [])

  if (isLoading) return <Spinner />
  if (isError)
    return (
      <ErrorComponent
        message={(error as any)?.data?.message}
        onRetry={refetch}
        className="flex h-[65vh] items-center justify-center"
      />
    )

  const activeChatData = chats[activeChat]
  console.log("activeChatData", activeChatData)

  return (
    <div className="lg:mx-auto">
      <div
        className="bg-secondary relative z-10 flex max-h-[85vh] flex-col overflow-y-hidden rounded-xl !px-8 py-6 text-white shadow-lg lg:flex-row"
        style={{
          borderTop: "8px solid var(--primary)",
          borderTopLeftRadius: "1rem",
          borderTopRightRadius: "1rem",
        }}
      >
        {/* left */}
        <div className="pr-8 lg:min-w-[30%] lg:border-r lg:border-gray-300">
          <div className="gray-300 flex items-end gap-x-5 border-b border-gray-300 py-4">
            <h4 className="text-2xl font-bold">Messages</h4>
            <p className="pb-1 font-semibold">12</p>
          </div>

          <div className="mx-auto mt-4 mb-10">
            {/* Search box */}
            <Search
              placeholder="Search messages..."
              onSearch={(value) => console.log(value)}
              size="large"
              style={{
                width: "100%",
              }}
              allowClear
            />

            {/* users list - TODO: Use dynamic data */}
            <div className="scroll-hide mt-4 max-h-[85vh] space-y-4 overflow-y-scroll pb-44">
              {chats?.map((data: any, idx: number) => (
                <div onClick={() => handleChangeActiveChat(idx)} key={idx}>
                  <ChatCard
                    unreadMessageCount={data?.unreadMessageCount}
                    data={data}
                    active={activeChat == idx}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* right */}
        <MessagesBox
          receiverId={activeChatData.chat.participants[0]._id}
          image={activeChatData.chat.participants[0].photoUrl}
          name={activeChatData.chat.participants[0].name}
          chatId={activeChatData.chat._id}
        />
      </div>
    </div>
  )
}

export default MessageContainer
