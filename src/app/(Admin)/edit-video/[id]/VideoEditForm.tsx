"use client"

import { Button, Col, Row } from "antd"
import FormWrapper from "@/components/form-components/FormWrapper"
import USelect from "@/components/form-components/USelect"
import UTextArea from "@/components/form-components/UTextArea"
import UUpload from "@/components/form-components/UUpload"
import Spinner from "@/components/skeletons/Spinner"
import ErrorComponent from "@/components/skeletons/ErrorComponent"
import { useGetAllPlaylistVideosQuery } from "@/redux/apis/playlistApi"
import { FieldValues, SubmitHandler } from "react-hook-form"
import { useGetVideoQuery, useUpdateVideoMutation } from "@/redux/apis/videoApi"
import handleMutation from "@/utils/handleMutation"
import { useAppSelector } from "@/redux/hooks"
import { selectUser } from "@/redux/slices/authSlice"
import { TPlaylist } from "../../videos/playlist/page"
import { usePathname } from "next/navigation"

export default function VideoEditForm() {
  const pathName = usePathname()
  const videoId = pathName.split("video/")[1]
  const user = useAppSelector(selectUser)
  const [updateVideo, { isLoading: isUpdating }] = useUpdateVideoMutation()

  const { data, isLoading, isError, error, refetch } =
    useGetAllPlaylistVideosQuery("")
  const {
    data: videoData,
    isLoading: isVideoLoading,
    isError: isVideoError,
    error: videoError,
  } = useGetVideoQuery(videoId, { skip: !videoId })

  const playlistsOptions = data?.data?.map((item: TPlaylist) => ({
    value: item._id,
    label: item.title,
  }))

  const defaultValues = {
    playlist: videoData?.data?.playlist?._id || "",
    description: videoData?.data?.description || "Sample video description",
    video: videoData?.data?.video
      ? [
          {
            uid: "-1",
            name: "video.mp4",
            url: videoData?.data?.video,
            status: "done",
          },
        ]
      : [],
    thumbnail: videoData?.data?.thumbnail
      ? [
          {
            uid: "-2",
            name: "thumbnail.jpg",
            url: videoData?.data?.thumbnail,
            status: "done",
          },
        ]
      : [],
  }

  if (isLoading || isVideoLoading) return <Spinner />
  if (isError || isVideoError)
    return (
      <ErrorComponent
        message={
          (error as any)?.data?.message || (videoError as any)?.data?.message
        }
        onRetry={refetch}
        className="flex h-[65vh] items-center justify-center"
      />
    )

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    const formData = new FormData()
    if (data.video?.[0]?.originFileObj) {
      formData.append("video", data.video[0].originFileObj)
    }
    if (data.thumbnail?.[0]?.originFileObj) {
      formData.append("thumbnail", data.thumbnail[0].originFileObj)
    }
    const payload = {
      playlist: data.playlist,
      description: data.description,
      author: user?._id,
    }
    formData.append("data", JSON.stringify(payload))
    handleMutation(
      { id: videoId, payload: formData },
      updateVideo,
      "Video is being updated...",
    )
  }

  return (
    <div className="dashboard-container">
      <FormWrapper onSubmit={onSubmit} defaultValues={defaultValues}>
        <Row gutter={40}>
          <Col span={14}>
            <UUpload
              name="video"
              fileType="video"
              label="Upload Video"
              uploadTitle="video"
              borderClassName="!h-52"
              required
            />
            <UUpload
              name="thumbnail"
              fileType="image"
              label="Upload Thumbnail"
              uploadTitle="thumbnail"
              borderClassName="!h-52"
              required
            />
            <UTextArea
              name="description"
              label="Video Description"
              placeholder="Enter video description"
              required
            />
          </Col>
          <Col
            span={10}
            style={{
              backgroundColor: "#303030",
              padding: "10px",
              borderRadius: "10px",
              height: "fit-content",
            }}
          >
            <USelect
              options={playlistsOptions}
              name="playlist"
              label="Select Playlist"
              placeholder="Select Playlist"
              required
            />
          </Col>
        </Row>
        <Button
          type="primary"
          htmlType="submit"
          size="large"
          className="!mt-3 w-full !py-5"
          loading={isUpdating}
        >
          {isUpdating ? "Updating..." : "Update Video"}
        </Button>
      </FormWrapper>
    </div>
  )
}
