"use client"

import FormWrapper from "@/components/form-components/FormWrapper"
import UInput from "@/components/form-components/UInput"
import { Button } from "antd"
import { FieldValues, SubmitHandler } from "react-hook-form"

export default function ChangePassForm() {
  const handleSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data)
  }

  return (
    <section className="mt-5 px-10">
      <FormWrapper
        onSubmit={handleSubmit}
        // resolver={zodResolver(changePasswordSchema)}
      >
        <UInput
          name="oldPassword"
          type="password"
          label="Old Password"
          placeholder="***********"
        />
        <UInput
          name="newPassword"
          type="password"
          label="New Password"
          placeholder="***********"
        />
        <UInput
          name="confirmPassword"
          type="password"
          label="Confirm Password"
          placeholder="***********"
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
