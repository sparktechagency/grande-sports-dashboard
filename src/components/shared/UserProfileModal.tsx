"use client"

import { Modal } from "antd"
import { Tag } from "antd"
import getTagColor from "@/utils/getTagColor"
import dayjs from "dayjs"
import CustomAvatar from "../CustomAvatar"
import { IUser } from "./UsersTable"

interface UserProfileModalProps {
  user?: IUser
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export default function UserProfileModal({
  user,
  open,
  setOpen,
}: UserProfileModalProps) {
  if (!user) return null

  return (
    <Modal
      centered
      open={open}
      footer={null}
      onCancel={() => {
        setOpen(false)
      }}
    >
      <div className="bg-primary flex flex-col items-center gap-4 rounded-lg py-4">
        <CustomAvatar src={user?.photoUrl} name={user?.name} size={160} />

        <h4 className="text-3xl font-bold text-white">{user?.name}</h4>
      </div>

      <div className="px-12 py-8">
        <div className="grid grid-cols-1 gap-7 md:grid-cols-2">
          {/* <div className="text-black">
            <h5 className="font-bold">User ID</h5>
            <p className="text-base">{user?.id}</p>
          </div> */}
          <div>
            <h5 className="font-bold">Name</h5>
            <p className="text-base">{user?.name}</p>
          </div>
          <div>
            <h5 className="font-bold">Email</h5>
            <p className="text-base">{user?.email}</p>
          </div>
          <div>
            <h5 className="font-bold">Contact</h5>
            <p className="text-base">{user?.contact || "N/A"}</p>
          </div>
          <div>
            <h5 className="!mb-1 font-bold">Status</h5>
            <Tag color={getTagColor(user?.status)} className="capitalize">
              {user?.status}
            </Tag>
          </div>
          <div>
            <h5 className="font-bold">Joined At</h5>
            <p>{dayjs(user?.createdAt).format("DD MMM YYYY, hh:mm A")}</p>
          </div>
        </div>
      </div>
    </Modal>
  )
}
