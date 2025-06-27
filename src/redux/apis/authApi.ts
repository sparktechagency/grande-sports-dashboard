import { baseApi } from "./baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    signIn: builder.mutation({
      query: (payload) => ({
        url: "/auth/login",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["auth"]
    }),
    verifyOtp: builder.mutation({
      query: ({ payload, token }) => ({
        url: "/otp/verify-otp",
        method: "POST",
        body: payload,
        credentials: "include",
        headers: {
          "Authorization": token
        },
      }),
      invalidatesTags: ["auth"]
    }),
    forgotPassword: builder.mutation({
      query: (payload) => ({
        url: "/auth/forget-password",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["auth"]
    }),
    resetPassword: builder.mutation({
      query: ({ payload, token }) => ({
        url: "/auth/reset-password",
        method: "POST",
        body: payload,
        headers: {
          "Authorization": token
        }
      }),
      invalidatesTags: ["auth"]
    }),
    changePassword: builder.mutation({
      query: (payload) => ({
        url: "/auth/change-password",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["auth"]
    })
  }),
})

export const { useSignInMutation, useVerifyOtpMutation, useResetPasswordMutation, useChangePasswordMutation, useForgotPasswordMutation } = authApi;