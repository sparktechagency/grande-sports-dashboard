"use client"

import FormWrapper from "@/components/form-components/FormWrapper"
import UInput from "@/components/form-components/UInput"
// import { zodResolver } from "@hookform/resolvers/zod";
// import { forgotPassSchema } from "@/schema/authSchema";
import { Button } from "antd"
import { SubmitHandler } from "react-hook-form"

interface IFormValues {
  email: string
}

export default function ForgotPassForm() {
  const onSubmit: SubmitHandler<IFormValues> = (data) => {
    console.log(data)
  }

  return (
    <div className="w-full px-6 py-8">
      <section className="mb-8 space-y-2">
        <h4 className="text-3xl font-semibold">Forgot Password</h4>
        <p className="text-dark-gray">
          Enter your email and we&apos;ll send you an otp for verification
        </p>
      </section>

      <FormWrapper onSubmit={onSubmit}>
        <UInput
          name="email"
          type="email"
          label="Email"
          placeholder="Enter your email"
          size="large"
          className="!h-10"
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
