"use client"

import FormWrapper from "@/components/form-components/FormWrapper"
import UInput from "@/components/form-components/UInput"
import { Button } from "antd"
import { FieldValues, SubmitHandler } from "react-hook-form"

export default function EditProfileForm() {
  const handleSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data)
  }

  return (
    <section className="mt-5 px-10">
      <FormWrapper
        onSubmit={handleSubmit}
        // resolver={zodResolver(editProfileSchema)}
        defaultValues={{
          name: "Miguel",
          email: "miguel@gmail.com",
          contact: "+1234567890",
        }}
      >
        <UInput
          name="name"
          label="Name"
          type="text"
          placeholder="Enter your name"
        />
        <UInput name="email" label="Email" type="email" disabled />
        <UInput
          name="contact"
          label="Contact"
          type="contact"
          placeholder="Enter your phone number"
        />

        <Button
          htmlType="submit"
          className="w-full"
          size="large"
          type="primary"
        >
          Save
        </Button>
      </FormWrapper>
    </section>
  )
}
