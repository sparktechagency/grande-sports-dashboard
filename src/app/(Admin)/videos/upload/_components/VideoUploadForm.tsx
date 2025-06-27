"use client"

import { useState } from "react"
import { Button, Col, Row, Tabs, TabsProps } from "antd"
import FormWrapper from "@/components/form-components/FormWrapper"
import UInput from "@/components/form-components/UInput"
import USelect from "@/components/form-components/USelect"
import UTextArea from "@/components/form-components/UTextArea"
import UUpload from "@/components/form-components/UUpload"
import ErrorComponent from "@/components/skeletons/ErrorComponent"
import Spinner from "@/components/skeletons/Spinner"
import {
  useCreatePlaylistMutation,
  useGetPlaylistQuery,
} from "@/redux/apis/playlistApi"
import { FieldValues, SubmitHandler } from "react-hook-form"
import { useAddVideoMutation } from "@/redux/apis/videoApi"
import handleMutation from "@/utils/handleMutation"

export default function VideoUploadForm() {
  const [activeTab, setActiveTab] = useState("selectPlaylist")
  const [addVideo, { isLoading: isAdding }] = useAddVideoMutation()
  const [createPlaylist, { isLoading: isCreatingPlaylist }] =
    useCreatePlaylistMutation()

  const { data, isLoading, isError, error, refetch } = useGetPlaylistQuery("")

  if (isLoading) return <Spinner />
  if (isError)
    return (
      <ErrorComponent
        message={(error as any)?.data?.message}
        onRetry={refetch}
        className="flex h-[65vh] items-center justify-center"
      />
    )

  const playlistOptions = data?.data?.map((item: any) => ({
    value: item._id,
    label: item.title,
  }))

  // handle upload
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log("data", data)
    if (activeTab === "createPlaylist") {
      handleMutation(
        { payload: { title: data.name, modelType: "ServiceVideo" } },
        createPlaylist,
        "Playlist is being created...",
        (res: any) => {
          data.playlist = res?.data?._id
          handleMutation(data, addVideo, "Video is being uploaded...")
        },
      )
    } else {
      const formData = new FormData()
      formData.append("video", data.video[0])
      formData.append("data", JSON.stringify(data))
      handleMutation(data, addVideo, "Video is being uploaded...")
    }
  }

  const tabItems: TabsProps["items"] = [
    {
      key: "selectPlaylist",
      label: "Select Playlist",
      children: (
        <USelect
          options={playlistOptions}
          name="playlist"
          label="Select Playlist"
          placeholder="Select Playlist"
          required
        />
      ),
    },
    {
      key: "createPlaylist",
      label: "Add New Playlist",
      children: (
        <UInput
          name="name"
          label="Playlist Name"
          placeholder="Enter playlist name"
          required
        />
      ),
    },
  ]

  return (
    <div className="dashboard-container">
      <FormWrapper onSubmit={onSubmit}>
        <Row gutter={40}>
          <Col span={14}>
            <UUpload
              name="video"
              fileType="video"
              label="Upload Video"
              uploadTitle="video"
              borderClassName="!h-52"
              required={activeTab !== "createPlaylist"}
            />

            <UTextArea
              name="description"
              label="Video Description"
              placeholder="Enter video description"
              required={activeTab !== "createPlaylist"}
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
            <Tabs
              activeKey={activeTab}
              onChange={(key) => setActiveTab(key)}
              items={tabItems}
              tabPosition="top"
              centered
              style={{ paddingInline: "20px", paddingBottom: "10px" }}
            />
          </Col>
        </Row>

        <Button
          type="primary"
          htmlType="submit"
          size="large"
          className="!mt-3 w-full !py-5"
          loading={isAdding || isCreatingPlaylist}
        >
          {isAdding || isCreatingPlaylist ? "Uploading..." : "Upload Video"}
        </Button>
      </FormWrapper>
    </div>
  )
}
