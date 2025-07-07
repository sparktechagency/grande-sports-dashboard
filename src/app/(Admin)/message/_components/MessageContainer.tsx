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
import { useAppSelector } from "@/redux/hooks"
import { selectUser } from "@/redux/slices/authSlice"
import { useSocket } from "@/redux/hooks/useSocket"
const { Search } = Input

const MessageContainer = () => {
  const user = useAppSelector(selectUser)
  const params = useSearchParams()
  const router = useRouter()
  const [activeChat, setActiveChat] = useState("")
  const [seenMessages] = useSeenMessageByChatIdMutation()

  // fetch my chats
  const { data, isLoading, isError, error, refetch } = useGetMyChatsQuery("")
  const chats = data?.data || []

  const [chatData, setChatData] = useState(chats)
  useEffect(() => {
    if (!isLoading && !isError) {
      setChatData(chats)
    }
  }, [isLoading, isError, chats])

  const handleChangeActiveChat = (id: string) => {
    router.push(`/message?activeChat=${id}`)
    setActiveChat(id)

    handleMutation(id, seenMessages, undefined, () => {
      refetch()
    })
  }

  useEffect(() => {
    const activeChat = params.get("activeChat")
    setActiveChat(activeChat || "")
  }, [params])

  // use socket to listen for new messages
  const socket = useSocket()
  useEffect(() => {
    // Connect socket if not already connected
    if (socket) {
      if (socket && !socket.connected) {
        socket.connect()
      }

      // Listen for real-time notification event
      socket.on(`chat-list::${user?._id}`, (newChatList: any) => {
        setChatData(newChatList)
        console.log("received realtime chat list,", newChatList)
      })

      socket.on("connect", () => {
        console.log("Socket connected")
      })
      socket.on("disconnect", () => {
        console.log("Socket disconnected")
      })

      return () => {
        socket.off(`chat-list::${user?._id}`)
        socket.off("connect")
        socket.off("disconnect")
        // Do not disconnect socket here to maintain connection across components
      }
    }
  }, [user, socket])

  if (isLoading) return <Spinner />
  if (isError)
    return (
      <ErrorComponent
        message={(error as any)?.data?.message}
        onRetry={refetch}
        className="flex h-[65vh] items-center justify-center"
      />
    )

  const activeChatData =
    chatData.find((data: any) => data.chat._id === activeChat) || chats[0] || {}

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
          {/* <div className="gray-300 flex items-end gap-x-5 border-b border-gray-300 py-4">
            <h4 className="text-2xl font-bold">Messages</h4>
            <p className="pb-1 font-semibold">12</p>
          </div> */}

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
              {chatData?.map((data: any, idx: number) => (
                <div
                  onClick={() => handleChangeActiveChat(data?.chat?._id)}
                  key={idx}
                >
                  <ChatCard
                    unreadMessageCount={data?.unreadMessageCount}
                    data={data}
                    active={activeChat == data?.chat?._id}
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
