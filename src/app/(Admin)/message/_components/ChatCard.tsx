import CustomAvatar from "@/components/CustomAvatar"
import { StaticImageData } from "next/image"

interface Chat {
  img: StaticImageData
  name: string
  latestMsg: string
}

interface ChatCardProps {
  chat: Chat
  active: boolean
}

const ChatCard = ({ chat, active }: ChatCardProps) => {
  const { img, name, latestMsg } = chat

  return (
    <div
      className={`flex-center-start cursor-pointer gap-x-3 px-2 py-3 ${
        active && "bg-primary rounded-xl text-white"
      }`}
    >
      <CustomAvatar src={img.src} name={name} size={60} />
      <div className="flex-grow space-y-1">
        <div className="flex items-center justify-between">
          <h4 className="text-xl font-medium">{name}</h4>
          <p
            className={`text-sm ${active ? "text-white" : "text-gray-400"}`}
          >
            12m ago
          </p>
        </div>
        <p className="text-ellipsis">{latestMsg}</p>
      </div>
    </div>
  )
}

export default ChatCard
