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
  privacyPolicy: string
}

export default function PrivacyPolicyContainer() {
  const [updateContent, { isLoading: isUpdating }] = useUpdateContentsMutation()
  const { data, isLoading, isError, error, refetch } = useGetContentsQuery("")
  const content = data?.data[0]?.privacyPolicy

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
      <h3 className="mb-6 text-2xl font-semibold">Privacy Policy</h3>

      <FormWrapper defaultValues={{ privacyPolicy: content }} onSubmit={handleSubmit}>
        <UTextEditor
          name="privacyPolicy"
          placeholder="Note: Enter details about your privacy policy here."
        />

        <Button
          type="primary"
          size="large"
          htmlType="submit"
          className="w-full rounded-xl !py-6"
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
