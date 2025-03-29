"use client"

import FormWrapper from "@/components/form-components/FormWrapper"
import UTextEditor from "@/components/form-components/UTextEditor"
import { Icon } from "@iconify/react"
import { Button, Flex } from "antd"
import { SubmitHandler } from "react-hook-form"

interface IFormValues {
  termsAndConditions: string
}

export default function TermsConditionsContainer() {
  const handleSubmit: SubmitHandler<IFormValues> = (data) => {
    console.log(data)
  }

  return (
    <section>
      <h3 className="mb-6 text-2xl font-semibold">Terms and Conditions</h3>

      <FormWrapper onSubmit={handleSubmit}>
        <UTextEditor
          name="termsAndConditions"
          placeholder="Note: Enter details about your terms and conditions here."
        />

        <Button
          type="primary"
          size="large"
          className="w-full rounded-xl"
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
