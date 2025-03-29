import CustomAvatar from "@/components/CustomAvatar"
import { Button, Flex } from "antd"
import { IPost } from "../page"
import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
import { Icon } from "@iconify/react"
import Video from "next-video"
import Image from "next/image"
// import Player from "next-video/player"

dayjs.extend(relativeTime)

interface PostCardProps {
  post: IPost
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <div className="bg-secondary h-auto w-full rounded-xl border border-gray-300 p-5">
      <Flex align="center" justify="space-between">
        <Flex align="start" gap={8}>
          <CustomAvatar
            src={post?.user?.profilePicture}
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
          <Button
            type="primary"
            variant="outlined"
            icon={<Icon icon="tdesign:edit" height={22} width={22} />}
          />

          <Button
            variant="solid"
            color="danger"
            icon={<Icon icon="iconamoon:trash-light" height={22} width={22} />}
          />
        </Flex>
      </Flex>

      <div className="mt-5 space-y-4">
        <article className="">{post?.content?.text}</article>

        <iframe
          width="100%"
          height="600"
          src="https://www.youtube.com/embed/2KWMoLr9aPY?si=Iva8zkx0ybIlp3nI"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  )
}
