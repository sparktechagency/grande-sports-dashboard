"use client"

import FormWrapper from "@/components/form-components/FormWrapper"
import UTextArea from "@/components/form-components/UTextArea"
import UUpload from "@/components/form-components/UUpload"
import ModalWrapper from "@/components/ModalWrapper"
import { Button } from "antd"
import { FieldValues, SubmitHandler } from "react-hook-form"
import {
  useUpdatePostMutation,
} from "@/redux/apis/postApi"
import handleMutation from "@/utils/handleMutation"

interface EditPostModalProps {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  post: any
}

export default function EditPostModal({
  open,
  setOpen,
  post,
}: EditPostModalProps) {
  const [updatePost, { isLoading: isUpdating }] = useUpdatePostMutation()

  const onSubmit: SubmitHandler<FieldValues> = (formData) => {
    const updatedData = new FormData()
    const updatePayload = {
      description: formData.description,
    }

    // Check if new file uploaded
    if (formData?.content?.[0]?.originFileObj) {
      updatedData.append("content", formData.content[0].originFileObj)
    }

    updatedData.append("data", JSON.stringify(updatePayload))

    handleMutation(
      { id: post?._id, payload: updatedData },
      updatePost,
      "Updating post...",
      () => setOpen(false),
    )
  }

  return (
    <ModalWrapper open={open} setOpen={setOpen} title="Edit Post" width="50%">
      <FormWrapper
        onSubmit={onSubmit}
        className="space-y-5 px-4 py-3"
        defaultValues={{
          description: post?.description,
        }}
      >
        <UUpload
          name="content"
          uploadTitle="media"
          fileType="both"
          borderClassName="h-[200px]"
          required={false}
        />

        <UTextArea
          name="description"
          placeholder="Update your thoughts..."
          minRows={8}
        />

        <Button
          type="primary"
          htmlType="submit"
          size="large"
          loading={isUpdating}
          className="w-full py-2"
        >
          {isUpdating ? "Updating..." : "Update Post"}
        </Button>
      </FormWrapper>
    </ModalWrapper>
  )
}
