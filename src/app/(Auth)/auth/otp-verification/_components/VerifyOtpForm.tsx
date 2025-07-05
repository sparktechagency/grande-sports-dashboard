"use client"

import FormWrapper from "@/components/form-components/FormWrapper"
import UOtpInput from "@/components/form-components/UOtpInput"
import { useVerifyOtpMutation } from "@/redux/apis/authApi"
import handleMutation from "@/utils/handleMutation"
import { otpSchema, TOtpSchema } from "@/validation/auth.validation"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "antd"
import { useRouter } from "next/navigation"
import { SubmitHandler } from "react-hook-form"
import Cookies from "js-cookie"

export default function VerifyOtpForm() {
  const router = useRouter()
  const [VerifyOtp, { isLoading }] = useVerifyOtpMutation()
  const onSubmit: SubmitHandler<TOtpSchema> = (data) => {
    const token = Cookies.get("verifyToken")
    handleMutation({ payload: data, token }, VerifyOtp, "Verifying...", () =>
      router.push("/auth/set-new-password"),
    )
  }

  return (
    <div className="px-6 py-8">
      <section className="mb-8 space-y-2">
        <h4 className="text-3xl font-semibold">Verify OTP</h4>
        <p className="text-dark-gray">
          Enter the otp that we&apos;ve sent to your email
        </p>
      </section>

      <FormWrapper onSubmit={onSubmit} resolver={zodResolver(otpSchema)}>
        <UOtpInput name="otp" />

        <Button
          type="primary"
          htmlType="submit"
          size="large"
          disabled={isLoading}
          className="!h-10 w-full !font-semibold"
        >
          {isLoading ? "Verifying..." : "Verify"}
        </Button>
      </FormWrapper>
    </div>
  )
}
