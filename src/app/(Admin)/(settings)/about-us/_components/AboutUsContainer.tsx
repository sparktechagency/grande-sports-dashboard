"use client"

import FormWrapper from "@/components/form-components/FormWrapper"
import UTextEditor from "@/components/form-components/UTextEditor"
import { Icon } from "@iconify/react"
import { Button, Flex } from "antd"
import { SubmitHandler } from "react-hook-form"

interface IFormValues {
  aboutUs: string
}

export default function AboutUsContainer() {
  const handleSubmit: SubmitHandler<IFormValues> = (data) => {
    console.log(data)
  }

  return (
    <section>
      <h3 className="mb-6 text-2xl font-semibold">About Us</h3>

      <FormWrapper onSubmit={handleSubmit}>
        <UTextEditor
          name="aboutUs"
          placeholder="Note: Enter details about the website here. (e.g How and why did you come up with the idea? etc)"
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
