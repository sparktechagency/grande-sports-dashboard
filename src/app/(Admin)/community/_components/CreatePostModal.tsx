"use client"

import FormWrapper from "@/components/form-components/FormWrapper"
import Image from "next/image"
import logoSmall from "@/assets/images/logo-small.svg"
import UTextArea from "@/components/form-components/UTextArea"
import { Button } from "antd"
import { FieldValues, SubmitHandler } from "react-hook-form"
import ModalWrapper from "@/components/ModalWrapper"
import UUpload from "@/components/form-components/UUpload"

interface CreatePostModalProps {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export default function CreatePostModal({
  open,
  setOpen,
}: CreatePostModalProps) {
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data)
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
          <UTextArea
            name="post"
            placeholder="What's on your mind?"
            minRows={3}
            style={{ width: "100%" }}
          />

          <UUpload
            name="video"
            uploadTitle="media"
            borderClassName="h-[200px]"
            required={false}
          />

          <Button
            type="primary"
            htmlType="submit"
            size="large"
            style={{ marginTop: "20px" }}
          >
            Submit
          </Button>
        </FormWrapper>
      </div>
    </ModalWrapper>
  )
}
