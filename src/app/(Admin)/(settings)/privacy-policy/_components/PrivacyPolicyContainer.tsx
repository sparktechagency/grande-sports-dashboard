"use client"

import FormWrapper from "@/components/form-components/FormWrapper"
import UTextEditor from "@/components/form-components/UTextEditor"
import { Icon } from "@iconify/react/dist/iconify.js"
import { Button, Flex } from "antd"
import { SubmitHandler } from "react-hook-form"

interface IFormValues {
  privacyPolicy: string
}

export default function PrivacyPolicyContainer() {
  const handleSubmit: SubmitHandler<IFormValues> = (data) => {
    console.log(data)
  }

  return (
    <section>
      <h3 className="mb-6 text-2xl font-semibold">Privacy Policy</h3>

      <FormWrapper onSubmit={handleSubmit}>
        <UTextEditor
          name="privacyPolicy"
          placeholder="Note: Enter details about your privacy policy here."
        />

        <Button
          type="primary"
          size="large"
          className="w-full rounded-xl !py-6"
          icon={
            <Flex align="center" justify="center">
              <Icon icon="bi:check" height={24} width={24} />
            </Flex>
          }
        >
          Save Changes
        </Button>
      </FormWrapper>
    </section>
  )
}
