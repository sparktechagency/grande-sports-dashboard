"use client"
import { ArrowLeft, Trash2 } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Pagination } from "antd"

import { useGetPlaylistVideosQuery } from "@/redux/apis/videoApi"
import { useDeletePlaylistMutation } from "@/redux/apis/playlistApi"

import Spinner from "@/components/skeletons/Spinner"
import ErrorComponent from "@/components/skeletons/ErrorComponent"
import CustomConfirm from "@/components/CustomConfirm"
import PlaylistVideoCard from "./PlaylistVideoCard"
import handleMutation from "@/utils/handleMutation"
import { TVideo } from "@/interface/video.interface"

export default function PlaylistDetails({
  params,
}: {
  params: { id: string }
}) {
  const router = useRouter()
  const id = params.id
  const [page, setPage] = useState(1)
  const limit = 5

  const { data, isLoading, isError, error, refetch } =
    useGetPlaylistVideosQuery({ playlistId: id, page, limit }, { skip: !id })

  const videos = data?.data || []
  const total = data?.meta?.total || 0

  const [deletePlaylist] = useDeletePlaylistMutation()
  const handleDelete = () => {
    handleMutation(id, deletePlaylist, "Playlist is being deleted...", () => {
      router.push("/videos/playlist")
    })
  }

  if (isLoading) return <Spinner />
  if (isError)
    return (
      <ErrorComponent
        message={(error as any)?.data?.message}
        onRetry={refetch}
        className="flex h-[65vh] items-center justify-center"
      />
    )

  if (videos.length === 0)
    return (
      <div className="flex h-[65vh] items-center justify-center">
        No videos found
      </div>
    )

  return (
    <div className="bg-secondary space-y-5 rounded-xl p-5">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-700 p-4">
        <div className="flex items-center gap-3">
          <Link href="/videos/playlist">
            <button className="rounded-full bg-green-600 p-2 transition-colors hover:bg-green-700">
              <ArrowLeft className="h-5 w-5 text-white" />
            </button>
          </Link>
          <h1 className="text-lg font-medium">{videos[0]?.playlist?.title}</h1>
        </div>
        <CustomConfirm onConfirm={handleDelete} title="Delete Playlist!">
          <button className="rounded-full p-2 transition-colors hover:bg-gray-800">
            <Trash2 className="h-5 w-5" />
          </button>
        </CustomConfirm>
      </div>

      {/* Video List */}
      <div className="space-y-6 p-4 pt-1">
        {videos?.map((video: TVideo) => (
          <PlaylistVideoCard key={video._id} video={video} />
        ))}
      </div>

      {/* Pagination */}
      {total > limit && (
        <div className="flex justify-end px-4 pb-2">
          <Pagination
            current={page}
            pageSize={limit}
            total={total}
            onChange={(page) => setPage(page)}
          />
        </div>
      )}
    </div>
  )
}
