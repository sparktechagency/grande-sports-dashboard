import CustomAvatar from "@/components/CustomAvatar"
import { Flex } from "antd"
import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
import Image from "next/image"
import { Pencil, Trash2 } from "lucide-react"
import CustomConfirm from "@/components/CustomConfirm"
import { useDeletePostMutation } from "@/redux/apis/postApi"
import handleMutation from "@/utils/handleMutation"
import { useState } from "react"
import EditPostModal from "./EditPostModal"
// import Player from "next-video/player"

dayjs.extend(relativeTime)

interface PostCardProps {
  post: any
}

export default function PostCard({ post }: PostCardProps) {
  const [showEditModal, setShowEditModal] = useState(false)

  const [deletePost] = useDeletePostMutation()
  const handleDelete = () => {
    handleMutation(post?._id, deletePost, "Post is being deleted...")
  }
  return (
    <div className="bg-secondary h-auto w-full rounded-xl border border-gray-300 p-5">
      <Flex align="center" justify="space-between">
        <Flex align="start" gap={8}>
          <CustomAvatar
            src={post?.user?.photoUrl}
            name={post?.user?.name}
            size={45}
          />

          <div>
            <h5 className="text-xl font-semibold">{post?.user?.name}</h5>
            <h5 className="font-thin text-gray-300">
              {dayjs().to(dayjs(post?.createdAt))}
            </h5>
          </div>
        </Flex>

        <Flex align="center" gap={8}>
          <button
            onClick={() => setShowEditModal(true)}
            className="bg-primary rounded-md p-2"
          >
            <Pencil size={16} />
          </button>

          <CustomConfirm onConfirm={handleDelete} title="Delete Post">
            <button className="rounded-md bg-red-600 p-2">
              <Trash2 size={16} />
            </button>
          </CustomConfirm>
        </Flex>
      </Flex>

      <div className="mt-5 space-y-4">
        <article className="whitespace-pre-wrap text-white">
          {post?.description}
        </article>

        {post?.content?.includes("/videos") ? (
          <video
            src={post?.content}
            controls
            className="max-h-[500px] w-full rounded-xl object-cover"
          />
        ) : (
          <Image
            src={post?.content}
            width={1000}
            height={600}
            alt={post.description || "Post media"}
            className="max-h-[500px] w-full rounded-xl object-cover"
          />
        )}
      </div>
      <EditPostModal
        open={showEditModal}
        setOpen={setShowEditModal}
        post={post}
      />
    </div>
  )
}
