import { z } from "zod"

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(4, "Password must be at least 6 characters"),
})

export const forgotPassSchema = z.object({
  email: z.string().email("Invalid email address"),
})

export const resetPassSchema = z
  .object({
    newPassword: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })

export type ResetPassSchema = z.infer<typeof resetPassSchema>

export const otpSchema = z.object({
  otp: z
    .string({ required_error: "Enter a 4 digit OTP" })
    .min(4, "OTP must be at least 4 digits")
    .max(4, "OTP must be at most 4 digits")
    .regex(/^\d+$/, "OTP must be numeric"),
})

export type TOtpSchema = z.infer<typeof otpSchema>