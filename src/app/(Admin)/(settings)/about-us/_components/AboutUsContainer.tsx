"use client"

import FormWrapper from "@/components/form-components/FormWrapper"
import UTextEditor from "@/components/form-components/UTextEditor"
import ErrorComponent from "@/components/skeletons/ErrorComponent"
import Spinner from "@/components/skeletons/Spinner"
import {
  useGetContentsQuery,
  useUpdateContentsMutation,
} from "@/redux/apis/contentApi"
import handleMutation from "@/utils/handleMutation"
import { Icon } from "@iconify/react"
import { Button, Flex } from "antd"
import { SubmitHandler } from "react-hook-form"

interface IFormValues {
  aboutUs: string
}

export default function AboutUsContainer() {
  const [updateContent, { isLoading: isUpdating }] = useUpdateContentsMutation()
  const { data, isLoading, isError, error, refetch } = useGetContentsQuery("")
  const content = data?.data[0]?.aboutUs
  if (isLoading) return <Spinner />
  if (isError)
    return (
      <ErrorComponent
        message={(error as any)?.data?.message}
        onRetry={refetch}
        className="flex h-[65vh] items-center justify-center"
      />
    )

  const handleSubmit: SubmitHandler<IFormValues> = (data) => {
    handleMutation(data, updateContent, "Saving...", () => {})
  }

  return (
    <section>
      <h3 className="mb-6 text-2xl font-semibold">About Us</h3>

      <FormWrapper defaultValues={{ aboutUs: content }} onSubmit={handleSubmit}>
        <UTextEditor
          name="aboutUs"
          placeholder="Note: Enter details about the website here. (e.g How and why did you come up with the idea? etc)"
        />

        <Button
          type="primary"
          size="large"
          htmlType="submit"
          className="w-full rounded-xl"
          loading={isUpdating}
          icon={
            <Flex align="center" justify="center">
              <Icon icon="bi:check" height={24} width={24} />
            </Flex>
          }
        >
          {isUpdating ? "Saving..." : "Save Changes"}
        </Button>
      </FormWrapper>
    </section>
  )
}
