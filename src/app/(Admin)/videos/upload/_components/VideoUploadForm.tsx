"use client"

import FormWrapper from "@/components/form-components/FormWrapper"
import UInput from "@/components/form-components/UInput"
import USelect from "@/components/form-components/USelect"
// import USelect from "@/components/form-components/USelect"
import UTextArea from "@/components/form-components/UTextArea"
import UUpload from "@/components/form-components/UUpload"
import { Button, Col, Row, Tabs, TabsProps } from "antd"
import { FieldValues, SubmitHandler } from "react-hook-form"

export default function VideoUploadForm() {
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data)
  }

  const createPlaylistHandler: SubmitHandler<FieldValues> = (data) => {
    console.log(data)
  }

  // Tab Items
  const tabItems: TabsProps["items"] = [
    {
      key: "selectPlaylist",
      label: "Select Playlist",
      children: (
        <USelect
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
        <FormWrapper onSubmit={createPlaylistHandler}>
          <UInput
            name="name"
            label="Playlist Name"
            placeholder="Enter playlist name"
            required
          />
          <Button type="primary">Submit</Button>
        </FormWrapper>
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
              required
            />
            <UInput
              name="title"
              label="Video Title"
              placeholder="Enter video title"
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
            <Tabs
              defaultActiveKey="selectPlaylist"
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
        >
          Submit
        </Button>
      </FormWrapper>
    </div>
  )
}
