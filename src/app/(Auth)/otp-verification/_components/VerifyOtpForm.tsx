"use client"

import FormWrapper from "@/components/form-components/FormWrapper"
import UOtpInput from "@/components/form-components/UOtpInput"
// import { otpSchema } from "@/schema/authSchema";
// import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "antd"
import { SubmitHandler } from "react-hook-form"

interface IFormValues {
  otp: string
}

export default function VerifyOtpForm() {
  const onSubmit: SubmitHandler<IFormValues> = (data) => {
    console.log(data)
  }

  return (
    <div className="px-6 py-8">
      <section className="mb-8 space-y-2">
        <h4 className="text-3xl font-semibold">Verify OTP</h4>
        <p className="text-dark-gray">
          Enter the otp that we&apos;ve sent to your email
        </p>
      </section>

      <FormWrapper onSubmit={onSubmit}>
        <UOtpInput name="otp" />

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
