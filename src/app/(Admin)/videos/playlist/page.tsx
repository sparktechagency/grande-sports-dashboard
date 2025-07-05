"use client"

import PlaylistCard from "./_components/PlaylistCard"
import { Pagination } from "antd"
import { useState } from "react"
import { useGetAllPlaylistVideosQuery } from "@/redux/apis/playlistApi"
import Spinner from "@/components/skeletons/Spinner"
import ErrorComponent from "@/components/skeletons/ErrorComponent"

export interface IPlaylist {
  key: number
  id: string
  title: string
  videos: number
  thumbnails: string[]
}

export interface TPlaylist {
  _id: string
  title: string
  playlistVideos: {
    thumbnail: string
  }[]
  totalVideos: number
}

export default function VideosPlaylist() {
  const [page, setPage] = useState(1)
  const limit = 8

  const { data, isLoading, isError, error, refetch } =
    useGetAllPlaylistVideosQuery({ page, limit })

  const playlists: TPlaylist[] = data?.data || []
  const meta = data?.meta || {}
  const total = meta.total || 0

  const playlistVideos = playlists.map((item: TPlaylist, idx: number) => ({
    key: idx,
    id: item._id,
    title: item.title,
    videos: item.totalVideos,
    thumbnails: item.playlistVideos.map((video) => video.thumbnail),
  }))

  if (isLoading) return <Spinner />
  if (isError)
    return (
      <ErrorComponent
        message={(error as any)?.data?.message}
        onRetry={refetch}
        className="flex h-[65vh] items-center justify-center"
      />
    )

  return (
    <div className="bg-secondary min-h-[85vh] space-y-5 rounded-xl p-5">
      <div className="flex flex-wrap items-center justify-start gap-x-2 gap-y-8">
        {playlistVideos.map((playlist, idx: number) => (
          <PlaylistCard key={idx} idx={idx} playlist={playlist} />
        ))}
      </div>

      {/* Pagination */}
      {total > limit && (
        <div className="flex justify-end pt-5">
          <Pagination
            current={page}
            total={total}
            pageSize={limit}
            onChange={(p) => setPage(p)}
          />
        </div>
      )}
    </div>
  )
}
