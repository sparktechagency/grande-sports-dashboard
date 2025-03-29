"use client"

import FormWrapper from "@/components/form-components/FormWrapper"
import UInput from "@/components/form-components/UInput"
// import { resetPassSchema } from "@/schema/authSchema";
// import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "antd"
import { SubmitHandler } from "react-hook-form"

interface IFormValues {
  newPassword: string
  confirmPassword: string
}

export default function SetPasswordForm() {
  const onSubmit: SubmitHandler<IFormValues> = (data) => {
    console.log(data)
  }

  return (
    <div className="px-6 py-8">
      <section className="mb-8 space-y-2">
        <h4 className="text-3xl font-semibold">Set New Password</h4>
        <p className="text-dark-gray">Enter your new password login</p>
      </section>

      <FormWrapper onSubmit={onSubmit}>
        <UInput
          name="newPassword"
          label="New Password"
          type="password"
          placeholder="*************"
          size="large"
          className="!mb-0 !h-10"
        />

        <UInput
          name="confirmPassword"
          label="Confirm Password"
          type="password"
          placeholder="*************"
          size="large"
          className="!mb-0 !h-10"
        />

        <Button
          type="primary"
          size="large"
          className="!h-10 w-full !font-semibold"
        >
          Submit
        </Button>
      </FormWrapper>
    </div>
  )
}
