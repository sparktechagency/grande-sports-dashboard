"use client"

import FormWrapper from "@/components/form-components/FormWrapper"
import Image from "next/image"
import logoSmall from "@/assets/images/logo-small.svg"
import UTextArea from "@/components/form-components/UTextArea"
import { Button } from "antd"
import { FieldValues, SubmitHandler } from "react-hook-form"
import ModalWrapper from "@/components/ModalWrapper"
import UUpload from "@/components/form-components/UUpload"
import { useCreatePostMutation } from "@/redux/apis/postApi"
import handleMutation from "@/utils/handleMutation"
import { useAppSelector } from "@/redux/hooks"
import { selectUser } from "@/redux/slices/authSlice"

interface CreatePostModalProps {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export default function CreatePostModal({
  open,
  setOpen,
}: CreatePostModalProps) {
  const user = useAppSelector(selectUser)
  const [addPost, { isLoading }] = useCreatePostMutation()
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    data.user = user?._id
    const formData = new FormData()
    formData.append("data", JSON.stringify(data))
    formData.append("content", data?.content[0]?.originFileObj)
    handleMutation(formData, addPost, "Creating post...", () => {
      setOpen(false)
    })
  }

  return (
    <ModalWrapper
      open={open}
      setOpen={setOpen}
      width={"50%"}
      title="Create new post"
    >
      <div className="flex items-start justify-start gap-x-4 px-6 py-4">
        <Image
          src={logoSmall}
          alt="Smaller logo of Grande Sports"
          height={50}
          width={50}
        />
        <FormWrapper onSubmit={onSubmit} className="!w-full">
          <UUpload
            name="content"
            uploadTitle="media"
            fileType="both"
            borderClassName="h-[200px]"
            required={false}
          />
          <UTextArea
            name="description"
            placeholder="What's on your mind?"
            minRows={8}
            style={{ width: "100%" }}
          />
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            style={{ marginTop: "20px" }}
            loading={isLoading}
          >
            {isLoading ? "Creating..." : "Create Post"}
          </Button>
        </FormWrapper>
      </div>
    </ModalWrapper>
  )
}
