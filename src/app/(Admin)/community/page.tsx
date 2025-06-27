"use client"

import { Button, Flex, Pagination } from "antd"
import { Icon } from "@iconify/react/dist/iconify.js"
import { lazy, useState } from "react"
import PostCard from "./_components/PostCard"
import { useGetMyPostsQuery } from "@/redux/apis/postApi"
import Spinner from "@/components/skeletons/Spinner"
import ErrorComponent from "@/components/skeletons/ErrorComponent"

const CreatePostModal = lazy(() => import("./_components/CreatePostModal"))

export default function Community() {
  const [showCreatePostModal, setShowCreatePostModal] = useState(false)
  const [page, setPage] = useState(1)
  const limit = 6

  const { data, isLoading, isError, error, refetch } = useGetMyPostsQuery({
    page,
    limit,
  })

  if (isLoading) return <Spinner />
  if (isError)
    return (
      <ErrorComponent
        message={(error as any)?.data?.message}
        onRetry={refetch}
        className="flex h-[65vh] items-center justify-center"
      />
    )

  const posts = data?.data || []
  const total = data?.meta?.total || 0

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
        {posts.map((post: any) => (
          <PostCard key={post._id} post={post} />
        ))}
      </section>

      {/* Pagination */}
      <div className="mt-10 text-center">
        {total > limit && (
          <Pagination
            current={page}
            pageSize={limit}
            total={total}
            onChange={(p) => setPage(p)}
            showSizeChanger={false}
          />
        )}
      </div>

      {/* Modals */}
      <CreatePostModal
        open={showCreatePostModal}
        setOpen={setShowCreatePostModal}
      />
    </div>
  )
}
