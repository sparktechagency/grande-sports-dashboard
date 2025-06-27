"use client"

import FormWrapper from "@/components/form-components/FormWrapper"
import UInput from "@/components/form-components/UInput"
import { Button } from "antd"
import { zodResolver } from "@hookform/resolvers/zod"
import { SubmitHandler } from "react-hook-form"

import { z } from "zod"
import { useChangePasswordMutation } from "@/redux/apis/authApi"
import handleMutation from "@/utils/handleMutation"

export const changePasswordSchema = z
  .object({
    oldPassword: z.string().min(6, "Old password is required"),
    newPassword: z
      .string()
      .min(6, "New password must be at least 6 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })

export type ChangePasswordSchema = z.infer<typeof changePasswordSchema>

export default function ChangePassForm() {
  const [changePass, { isLoading }] = useChangePasswordMutation()
  const handleSubmit: SubmitHandler<ChangePasswordSchema> = (data) => {
    handleMutation(data, changePass, "Saving...")
  }

  return (
    <section className="mt-5 px-10">
      <FormWrapper
        onSubmit={handleSubmit}
        resolver={zodResolver(changePasswordSchema)}
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
          disabled={isLoading}
        >
          {isLoading ? "Saving..." : "Save Changes"}
        </Button>
      </FormWrapper>
    </section>
  )
}
