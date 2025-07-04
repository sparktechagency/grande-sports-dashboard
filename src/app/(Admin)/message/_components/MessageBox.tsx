"use client"

import Image from "next/image"
import { Icon } from "@iconify/react/dist/iconify.js"
import { useAppSelector } from "@/redux/hooks"
import { selectUser } from "@/redux/slices/authSlice"
import { useGetMyMessagesQuery } from "@/redux/apis/messageApi"
import MessageForm from "./MessageForm"
import ReceivedMessage from "./ReceivedMessage"
import OwnerMsgCard from "./OwnerMsgCard"
import userImg from "@/assets/images/user.png"


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
  const { data } = useGetMyMessagesQuery(chatId, { skip: !chatId })
  const messages = data?.data || []

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

            <div className="mt-1 flex items-center gap-x-2">
              <div className="h-2 w-2 rounded-full bg-green-500" />
              <p className="border-t-black">Online</p>
            </div>
          </div>
        </div>

        <button className="flex items-center gap-x-2">
          <Icon
            icon="icomoon-free:blocked"
            height={20}
            width={20}
            color="#d55758"
          />
          <p className="text-xl">Block</p>
        </button>
      </div>

      <div className="scrollbar-no-bg mb-6 flex-1 space-y-6 overflow-y-auto pt-6 pr-2">
        {messages.map((msg: { _id: string; text: string; sender: string }) => {
          const isMine = msg.sender === user?._id

          return (
            <div
              key={msg._id}
              className={`flex ${isMine ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[70%] ${isMine ? "text-right" : "text-left"}`}
              >
                {isMine ? (
                  <OwnerMsgCard message={msg.text} />
                ) : (
                  <ReceivedMessage message={msg.text} />
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
