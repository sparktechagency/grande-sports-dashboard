import CustomAvatar from "@/components/CustomAvatar"
import { StaticImageData } from "next/image"

interface User {
  img: StaticImageData
  name: string
  latestMsg: string
}

interface UserCardProps {
  user: User
  active: boolean
}

const UserCard = ({ user, active }: UserCardProps) => {
  const { img, name, latestMsg } = user

  return (
    <div
      className={`flex-center-start gap-x-3 px-2 py-3 ${
        active ? "bg-primary rounded-xl text-white" : "text-black"
      }`}
    >
      <CustomAvatar src={img.src} name={name} size={60} />

      <div className="flex-grow space-y-1">
        <div className="flex items-center justify-between">
          <h4 className="text-xl font-medium">{name}</h4>
          {!active && (
            <p className="text-sm font-medium text-gray-500">12m ago</p>
          )}
        </div>
        <p className="text-ellipsis">{latestMsg}</p>
      </div>
    </div>
  )
}

export default UserCard
