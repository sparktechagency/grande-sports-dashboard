"use client"

import FormWrapper from "@/components/form-components/FormWrapper"
import UInput from "@/components/form-components/UInput"
import { useForgotPasswordMutation } from "@/redux/apis/authApi"
import handleMutation from "@/utils/handleMutation"
import { forgotPassSchema } from "@/validation/auth.validation"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "antd"
import { useRouter } from "next/navigation"
import { SubmitHandler } from "react-hook-form"
import { z } from "zod"
import Cookies from "js-cookie"

type IFormValues = z.infer<typeof forgotPassSchema>

export default function ForgotPassForm() {
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation()
  const router = useRouter()
  const onSuccess = (res: any) => {
    Cookies.set("verifyToken", res.data.verifyToken, { path: "/" })
    router.push(`/auth/otp-verification`)
  }
  const onSubmit: SubmitHandler<IFormValues> = (data) => {
    handleMutation(data, forgotPassword, "Sending OTP...", onSuccess)
  }

  return (
    <div className="w-full px-6 py-8">
      <section className="mb-8 space-y-2">
        <h4 className="text-3xl font-semibold">Forgot Password</h4>
        <p className="text-dark-gray">
          Enter your email and we&apos;ll send you an otp for verification
        </p>
      </section>

      <FormWrapper onSubmit={onSubmit} resolver={zodResolver(forgotPassSchema)}>
        <UInput
          name="email"
          type="email"
          label="Email"
          placeholder="Enter your email"
          size="large"
          className="!h-10"
        />

        <Button
          htmlType="submit"
          type="primary"
          disabled={isLoading}
          size="large"
          className="!h-10 w-full !font-semibold"
        >
          {isLoading ? "Sending OTP..." : "Send OTP"}
        </Button>
      </FormWrapper>
    </div>
  )
}
