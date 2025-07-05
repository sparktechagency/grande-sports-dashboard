import CustomAvatar from "@/components/CustomAvatar"
import { timeAgo } from "@/utils/timeAgo"

interface ChatCardProps {
  data: any
  active: boolean
  unreadMessageCount?: number
}

const ChatCard = ({ data, active }: ChatCardProps) => {
  const { chat, message, unreadMessageCount } = data
  const user = chat?.participants[0]
  const isRead = message?.seen || active
  return (
    <div
      className={`flex-center-start cursor-pointer gap-x-3 px-2 py-3 ${
        active && "bg-primary rounded-xl text-white"
      }`}
    >
      <CustomAvatar src={user?.photoUrl} name={user?.name} size={60} />
      <div className="flex-grow space-y-1">
        <div className="flex items-center justify-between">
          <h4 className={`text-xl ${isRead ? "font-normal" : "font-bold"}`}>
            {user?.name || "Unknown User"}
          </h4>
          <div className="relative -mt-2 flex h-full flex-col items-end justify-between">
            <p className={`text-sm ${active ? "text-white" : "text-gray-400"}`}>
              {timeAgo(message?.createdAt)}
            </p>
            {!active && unreadMessageCount > 0 && (
              <p
                className={`bg-primary absolute top-8 flex h-[22px] w-[22px] items-center justify-center rounded-full text-[12px]`}
              >
                {unreadMessageCount}
              </p>
            )}
          </div>
        </div>
        <p className={`text-ellipsis ${isRead ? "font-normal" : "font-bold"}`}>
          {message?.text?.slice(0, 35)}...
        </p>
      </div>
    </div>
  )
}

export default ChatCard
