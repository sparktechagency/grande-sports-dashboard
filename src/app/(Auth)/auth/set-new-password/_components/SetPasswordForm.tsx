"use client"

import FormWrapper from "@/components/form-components/FormWrapper"
import UInput from "@/components/form-components/UInput"
import { useResetPasswordMutation } from "@/redux/apis/authApi"
import handleMutation from "@/utils/handleMutation"
import { resetPassSchema, ResetPassSchema } from "@/validation/auth.validation"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "antd"
import { SubmitHandler } from "react-hook-form"
import Cookies from "js-cookie"
import { useRouter } from "next/navigation"
import { jwtDecode } from "jwt-decode"

export default function SetPasswordForm() {
  const router = useRouter()
  const [setPassword, { isLoading }] = useResetPasswordMutation()
  const onSuccess = () => {
    router.push("/auth/login")
    Cookies.remove("verifyToken")
  }
  const onSubmit: SubmitHandler<ResetPassSchema> = (data) => {
    const token = Cookies.get("verifyToken")
    const decoded: any = jwtDecode(token!)
    handleMutation(
      { payload: { ...data, email: decoded?.email }, token },
      setPassword,
      "New password is being set...",
      onSuccess,
    )
  }
  return (
    <div className="px-6 py-8">
      <section className="mb-8 space-y-2">
        <h4 className="text-3xl font-semibold">Set New Password</h4>
        <p className="text-dark-gray">Enter your new password to login</p>
      </section>

      <FormWrapper onSubmit={onSubmit} resolver={zodResolver(resetPassSchema)}>
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
          htmlType="submit"
          type="primary"
          size="large"
          disabled={isLoading}
          className="!h-10 w-full !font-semibold"
        >
          {isLoading ? "Submitting..." : "Submit"}
        </Button>
      </FormWrapper>
    </div>
  )
}
