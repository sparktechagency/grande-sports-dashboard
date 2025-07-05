"use client"

import React from "react"
import ReactPlayer from "react-player"
import { Dropdown, MenuProps, Spin } from "antd"
import { TVideo } from "@/interface/video.interface"
import { EllipsisVertical } from "lucide-react"
import Link from "next/link"
import CustomConfirm from "@/components/CustomConfirm"
import { useDeleteVideoMutation } from "@/redux/apis/videoApi"
import handleMutation from "@/utils/handleMutation"

const PlaylistVideoCard = ({ video }: { video: TVideo }) => {
  const [deleteVideo] = useDeleteVideoMutation()
  const handleDelete = () => {
    handleMutation(video?._id, deleteVideo, "Video is being deleted...")
  }
  console.log("video?._id", video?._id)
  const items: MenuProps["items"] = [
    {
      label: <Link href={`/edit-video/${video?._id}`}>Edit</Link>,
      key: "1",
    },
    {
      label: (
        <CustomConfirm title="Delete Video!" onConfirm={handleDelete}>
          <button className="text-red-600">Delete</button>
        </CustomConfirm>
      ),
      key: "0",
    },
  ]
  return (
    <div className="playlistVideo flex gap-6 rounded-lg">
      <div className="h-[210px] w-[330px]">
        <React.Suspense fallback={<Spin size="large" />}>
          <ReactPlayer
            url={video?.video}
            light={video?.thumbnail}
            playing={true}
            controls={true}
            width={330}
            height={210}
          />
        </React.Suspense>
      </div>
      <div className="flex w-full justify-between gap-3">
        <div className="py-3">
          <p className="text-xl">{`${video?.description?.length > 320 ? `${video?.description?.slice(0, 320)}...` : video?.description}`}</p>
          <p className="mt-6 text-base font-medium text-gray-300">
            {video?.playlist?.title}
          </p>
          <p className="mt-1 text-[15px] font-medium text-gray-300">
            {video?.contentMeta?.view} Views
          </p>
        </div>
        <div>
          <button className="cursor-pointer p-2">
            <Dropdown menu={{ items }} trigger={["click"]}>
              <a onClick={(e) => e.preventDefault()}>
                <EllipsisVertical className="text-white" size={20} />
              </a>
            </Dropdown>
          </button>
        </div>
      </div>
    </div>
  )
}

export default PlaylistVideoCard
