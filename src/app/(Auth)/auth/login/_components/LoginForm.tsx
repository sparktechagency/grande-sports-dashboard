/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import Link from "next/link"
import { Button } from "antd"
import FormWrapper from "@/components/form-components/FormWrapper"
import UInput from "@/components/form-components/UInput"
import { SubmitHandler } from "react-hook-form"
import { loginSchema } from "@/validation/auth.validation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useAppDispatch } from "@/redux/hooks"
import { setUser } from "@/redux/slices/authSlice"
import { useRouter, useSearchParams } from "next/navigation"
import handleMutation from "@/utils/handleMutation"
import { useSignInMutation } from "@/redux/apis/authApi"
import { jwtDecode } from "jwt-decode"
import { toast } from "react-toastify"

interface IFormValues {
  email: string
  password: string
}

export default function LoginForm() {
  const dispatch = useAppDispatch()
  const params = useSearchParams()
  const router = useRouter()
  const redirectUrl = params.get("redirect") || "/dashboard"
  const onSuccess = (res: any) => {
    const user = jwtDecode(res.data.accessToken)
    if ((user as any).role !== "admin")
      return toast.warning("You are not an admin!")
    dispatch(
      setUser({
        user,
        accessToken: res.data.accessToken,
        refreshToken: res.data.refreshToken,
      }),
    )
    router.push(redirectUrl)
  }

  // handle login
  const [login, { isLoading }] = useSignInMutation()
  const onLoginSubmit: SubmitHandler<IFormValues> = async (data) => {
    handleMutation(data, login, "Logging in...", onSuccess)
  }
  return (
    <div className="w-full rounded-none px-6 py-8">
      <section className="mb-6 space-y-2">
        <h4 className="text-3xl font-semibold">Login</h4>
        <p className="text-dark-gray">
          Enter your email and password to access admin panel
        </p>
      </section>

      <FormWrapper
        onSubmit={onLoginSubmit}
        resolver={zodResolver(loginSchema)}
        defaultValues={{
          email: "junayednoman05@gmail.com",
          password: "encrypted",
        }}
      >
        <UInput
          name="email"
          type="email"
          label="Email"
          placeholder="Enter your email"
          size="large"
          className="!h-10"
        />

        <UInput
          name="password"
          label="Password"
          type="password"
          placeholder="*************"
          size="large"
          className="!mb-0 !h-10"
        />

        <Button
          htmlType="submit"
          type="primary"
          size="large"
          className="!h-10 w-full !font-semibold"
          disabled={isLoading}
        >
          {isLoading ? "Logging in..." : "Login"}
        </Button>

        <Link
          href="/auth/forgot-password"
          className="text-primary-blue hover:text-primary-blue/85 mt-2 block text-center font-medium"
        >
          Forgot Password?
        </Link>
      </FormWrapper>
    </div>
  )
}
