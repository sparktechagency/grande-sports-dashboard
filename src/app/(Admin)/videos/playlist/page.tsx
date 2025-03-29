"use client"

import thumbnailImage from "@/assets/images/playlist 0.jpg"
import thumbnailImage1 from "@/assets/images/playlist1.jpg"
import thumbnailImage2 from "@/assets/images/playlist2.jpg"
import { StaticImageData } from "next/image"
import PlaylistCard from "./_components/PlaylistCard"
import { Pagination } from "antd"

export interface IPlaylist {
  key: number
  id: string
  title: string
  videos: number
  thumbnails: StaticImageData[]
}

//! Dummy data
const playlists: IPlaylist[] = Array.from({ length: 10 }).map((_, index) => ({
  key: index + 1,
  id: "#ghqRTawalH",
  title: "Football Highlights",
  videos: 100,
  thumbnails: [thumbnailImage2, thumbnailImage1, thumbnailImage],
}))

export default function VideosPlaylist() {
  return (
    <div className="bg-secondary min-h-[85vh] space-y-5 rounded-xl p-5">
      <div className="flex flex-wrap items-center justify-start gap-x-4 gap-y-8">
        {playlists.map((playlist, idx) => (
          <PlaylistCard key={playlist.id} idx={idx} playlist={playlist} />
        ))}
      </div>

      {/* Pagination */}
      <Pagination align="end" total={20} pageSize={10} />
    </div>
  )
}
