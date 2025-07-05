"use client"

import FormWrapper from "@/components/form-components/FormWrapper"
import UInput from "@/components/form-components/UInput"
import { useUpdateProfileMutation } from "@/redux/apis/userApi"
import handleMutation from "@/utils/handleMutation"
import { Button } from "antd"
import { FieldValues, SubmitHandler } from "react-hook-form"

export default function EditProfileForm({
  name,
  email,
  contact,
}: {
  name: string
  email: string
  contact: string
}) {
  const [updateProfile, { isLoading }] = useUpdateProfileMutation()
  const handleSubmit: SubmitHandler<FieldValues> = (data) => {
    handleMutation(data, updateProfile, "Saving...")
  }
  return (
    <section className="mt-5 px-10">
      <FormWrapper
        onSubmit={handleSubmit}
        // resolver={zodResolver(editProfileSchema)}
        defaultValues={{
          name: name,
          email: email,
          contact: contact,
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
          disabled={isLoading}
        >
          {isLoading ? "Saving..." : "Save Changes"}
        </Button>
      </FormWrapper>
    </section>
  )
}
