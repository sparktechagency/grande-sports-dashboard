"use client"

import { Button, Flex } from "antd"
import { Icon } from "@iconify/react/dist/iconify.js"
import { lazy, useState } from "react"
import userImg from "@/assets/images/user.png"
import PostCard from "./_components/PostCard"
import thumbnailImg from "@/assets/images/video-thumbnail.jpg"
import { StaticImageData } from "next/image"

const CreatePostModal = lazy(() => import("./_components/CreatePostModal"))

export interface IPost {
  key: number
  user: {
    name: string
    profilePicture: string
  }
  content: {
    text: string
    videoUrl: string
    videoThumbnail: StaticImageData
  }
  createdAt: Date
}

//! Dummy Posts
const posts: IPost[] = Array.from({ length: 5 }).map((_, index) => ({
  key: index + 1,
  user: {
    name: "John Doe",
    profilePicture: userImg?.src,
  },
  content: {
    text: "Football, also known as soccer, is the world's most popular sport, bringing together players and fans from all corners of the globe. It’s a game of skill, strategy, and passion, where teamwork and dedication make the difference. Whether you're perfecting your dribbling, mastering precise passes, or training for peak fitness, football pushes athletes to their limits.",
    videoUrl: "https://youtu.be/2KWMoLr9aPY",
    videoThumbnail: thumbnailImg,
  },
  createdAt: new Date(),
}))

export default function Community() {
  const [showCreatePostModal, setShowCreatePostModal] = useState<boolean>(false)

  return (
    <div className="mx-auto w-[90%] lg:w-[85%] xl:w-3/4">
      <Flex align="center" justify="space-between" wrap>
        <h3 className="text-2xl font-bold text-white">Community Posts</h3>
        <Button
          type="primary"
          htmlType="submit"
          size="large"
          icon={<Icon icon="cuida:plus-outline" />}
          onClick={() => setShowCreatePostModal(true)}
        >
          Create Post
        </Button>
      </Flex>

      {/* Posts */}
      <section className="mt-10 space-y-10">
        {posts.map((post) => (
          <PostCard key={post.key} post={post} />
        ))}
      </section>

      {/* Modals */}
      <CreatePostModal
        open={showCreatePostModal}
        setOpen={setShowCreatePostModal}
      />
    </div>
  )
}
