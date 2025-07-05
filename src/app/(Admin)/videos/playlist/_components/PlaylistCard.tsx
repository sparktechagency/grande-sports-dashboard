import CustomConfirm from "@/components/CustomConfirm"
import { IPlaylist } from "../page"
import { cn } from "@/utils/utils"
import { Icon } from "@iconify/react"
import { Flex } from "antd"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useDeletePlaylistMutation } from "@/redux/apis/playlistApi"
import handleMutation from "@/utils/handleMutation"

interface PlaylistCardProps {
  playlist: IPlaylist
  idx: number
}

const ThumbnailHeight = 250
const ThumbnailWidth = 350
const VideosCountBadgePosition = {
  bottom: ThumbnailHeight * 0.05,
  right: ThumbnailWidth * 0.03,
}

export default function PlaylistCard({ playlist, idx }: PlaylistCardProps) {
  const currentPathname = usePathname()
  const [deletePlaylist] = useDeletePlaylistMutation()

  const handleDelete = () => {
    handleMutation(playlist.id, deletePlaylist, "Playlist is being deleted...")
  }

  return (
    <div key={idx}>
      <div
        style={{
          height: ThumbnailHeight,
          width: ThumbnailWidth,
          position: "relative",
        }}
      >
        <div className="h-full w-full">
          {playlist?.thumbnails?.length > 0
            ? playlist?.thumbnails?.map((thumbnail, thumbIdx) => (
                <Image
                  width={ThumbnailWidth}
                  height={ThumbnailHeight}
                  key={thumbIdx}
                  src={thumbnail}
                  alt={playlist.title}
                  className={cn(
                    "border-secondary/50 absolute inset-0 mx-auto block h-[95%] w-full cursor-pointer rounded-xl border object-cover object-center transition-all duration-300 ease-in-out hover:brightness-80",
                    thumbIdx === 0
                      ? "top-0 w-[92%]"
                      : thumbIdx === 1
                        ? "top-2 w-[96%]"
                        : "top-4",
                  )}
                />
              ))
            : Array.from({ length: 1 }, (_, thumbIdx) => (
                <Image
                  width={ThumbnailWidth}
                  height={ThumbnailHeight}
                  key={thumbIdx}
                  src={
                    "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png"
                  }
                  alt={playlist.title}
                  className={cn(
                    "border-secondary/50 absolute inset-0 mx-auto block h-[95%] w-full cursor-pointer rounded-xl border object-cover object-center transition-all duration-300 ease-in-out hover:brightness-80",
                    thumbIdx === 0
                      ? "top-0 w-[92%]"
                      : thumbIdx === 1
                        ? "top-2 w-[96%]"
                        : "top-4",
                  )}
                />
              ))}
        </div>

        <CustomConfirm onConfirm={handleDelete} title="Delete Playlist">
          <button
            style={{
              position: "absolute",
              top: 10,
              right: 20,
              backgroundColor: "rgba(37, 37, 37, 0.8)",
              borderRadius: "50%",
              padding: "5px",
              cursor: "pointer",
            }}
          >
            <Icon
              icon="solar:trash-bin-trash-bold"
              height={20}
              width={20}
              color="#ff4d4f"
            />
          </button>
        </CustomConfirm>

        <Flex
          align="center"
          justify="start"
          gap={5}
          style={{
            position: "absolute",
            bottom: VideosCountBadgePosition.bottom,
            right: VideosCountBadgePosition.right,
            backgroundColor: "rgba(37, 37, 37, 0.8)",
            padding: "2px 8px",
            borderRadius: "7px",
            fontSize: 12,
          }}
          role="button"
        >
          <Icon icon="solar:playlist-bold" height={20} width={20} />
          <span>{playlist.videos} videos</span>
        </Flex>
      </div>

      <Link
        href={currentPathname + `/${playlist.id}`}
        className="mt-3 !block space-y-1"
      >
        <h4 className="text-2xl font-medium text-white">{playlist.title}</h4>
        <p className="!text-gray-300">View full playlist</p>
      </Link>
    </div>
  )
}
