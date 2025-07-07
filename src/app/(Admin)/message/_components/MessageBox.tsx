"use client"

import Image from "next/image"
import { useAppSelector } from "@/redux/hooks"
import { selectUser } from "@/redux/slices/authSlice"
import {
  useDeleteChatMutation,
  useGetMyMessagesQuery,
} from "@/redux/apis/messageApi"
import MessageForm from "./MessageForm"
import ReceivedMessage from "./ReceivedMessage"
import OwnerMsgCard from "./OwnerMsgCard"
import userImg from "@/assets/images/user.png"
import { Trash2 } from "lucide-react"
import CustomConfirm from "@/components/CustomConfirm"
import handleMutation from "@/utils/handleMutation"
import { useEffect, useState, useRef } from "react"
import { useSocket } from "@/redux/hooks/useSocket"

const MessagesBox = ({
  image,
  name,
  chatId,
  receiverId,
}: {
  image: string
  name: string
  chatId: string
  receiverId: string
}) => {
  const user = useAppSelector(selectUser)
  const { data, isLoading, isError } = useGetMyMessagesQuery(chatId, {
    skip: !chatId,
  })
  const messageData = data?.data || []

  const [messages, setMessages] = useState(messageData)
  useEffect(() => {
    if (!isLoading && !isError) {
      setMessages(messageData)
    }
  }, [isLoading, isError, messageData])

  // Ref for the message container
  const messagesContainerRef = useRef<HTMLDivElement>(null)

  // Scroll to bottom when messages update
  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTo({
        top: messagesContainerRef.current.scrollHeight,
        behavior: "smooth",
      })
    }
  }, [messages]) // Trigger on messages change

  // use socket to listen for new messages
  const socket = useSocket()
  useEffect(() => {
    // Connect socket if not already connected
    if (socket) {
      if (socket && !socket.connected) {
        socket.connect()
      }

      // Listen for real-time notification event
      socket.on(`new-message::${chatId}`, (newMessage: any) => {
        console.log("Received real-time message:", newMessage)
        setMessages((prev: any) => [...prev, newMessage])
      })

      socket.on("connect", () => {
        console.log("Socket connected")
      })
      socket.on("disconnect", () => {
        console.log("Socket disconnected")
      })

      return () => {
        socket.off(`new-message::${chatId}`)
        socket.off("connect")
        socket.off("disconnect")
        // Do not disconnect socket here to maintain connection across components
      }
    }
  }, [chatId, socket])

  // default function to handle chat deletion
  const [deleteChat] = useDeleteChatMutation()
  const handleDeleteChat = () => {
    handleMutation(chatId, deleteChat, "Chat is being deleted...")
  }

  return (
    <div className="flex flex-col justify-between lg:flex-grow lg:px-8">
      <div className="flex items-center justify-between border-b border-gray-300 pb-1">
        <div className="flex items-center gap-x-3">
          <div className="w-[60px]">
            <Image
              width={60}
              height={60}
              src={image || userImg}
              alt={name}
              className="aspect-square h-[60px] w-[60px] rounded-full object-cover"
            />
          </div>

          <div className="lg:flex-grow">
            <h3 className="text-xl font-semibold">{name || "Unknown User"}</h3>

            {/* <div className="mt-1 flex items-center gap-x-2">
              <div className="h-2 w-2 rounded-full bg-green-500" />
              <p className="border-t-black">Online</p>
            </div> */}
          </div>
        </div>

        <CustomConfirm title="Delete Chat" onConfirm={handleDeleteChat}>
          <button>
            <Trash2 size={22} color="#d55758" />
          </button>
        </CustomConfirm>
      </div>

      <div
        ref={messagesContainerRef}
        className="scrollbar-no-bg mb-6 flex-1 space-y-6 overflow-y-auto pt-6 pr-2"
      >
        {messages.map((msg: { _id: string; text: string; sender: string }) => {
          const isMine = msg?.sender === user?._id

          return (
            <div
              key={msg?._id}
              className={`flex ${isMine ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[70%] ${isMine ? "text-right" : "text-left"}`}
              >
                {isMine ? (
                  <OwnerMsgCard message={msg?.text} />
                ) : (
                  <ReceivedMessage message={msg?.text} />
                )}
              </div>
            </div>
          )
        })}
      </div>

      <MessageForm chatId={chatId} receiverId={receiverId} />
    </div>
  )
}

export default MessagesBox
