"use client"

import Link from "next/link"
import { Button } from "antd"
import { useRouter } from "next/navigation"
// import { useDispatch } from "react-redux";
// import { useSignInMutation } from "@/redux/api/authApi";
import catchAsync from "@/utils/catchAsync"
import { toast } from "react-toastify"
// import { setUser } from "@/redux/features/authSlice";
// import { jwtDecode } from "jwt-decode"
import FormWrapper from "@/components/form-components/FormWrapper"
import UInput from "@/components/form-components/UInput"
import { SubmitHandler } from "react-hook-form"
// import usePushNotification from "@/hooks/usePushNotification";

interface IFormValues {
  email: string
  password: string
}

export default function LoginForm() {
  const router = useRouter()
  // const dispatch = useDispatch();
  // const [signIn, { isLoading }] = useSignInMutation();

  // const { fcmToken, notificationPermissionStatus } = usePushNotification();

  const onLoginSubmit: SubmitHandler<IFormValues> = async (data) => {
    // if (fcmToken) {
    //   data["fcm_token"] = fcmToken;
    // }

    await catchAsync(async () => {
      // const res = await signIn(data).unwrap();
      // toast.success("Successfully Logged In!");

      // // set user
      // dispatch(
      //   setUser({
      //     user: jwtDecode(res?.data?.token),
      //     token: res?.data?.token,
      //   }),
      // );

      // // send user back or home
      // router.push("/");
      // router.refresh();
      console.log(data)
      toast.success("Successfully Logged In!")
      router.push("/dashboard")
    })
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
        // resolver={zodResolver(loginSchema)}
        // defaultValues={{
        //   email: "admin@gmail.com",
        //   password: "admin",
        // }}
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
          // loading={isLoading}
        >
          Log In
        </Button>

        <Link
          href="/forgot-password"
          className="text-primary-blue hover:text-primary-blue/85 mt-2 block text-center font-medium"
        >
          Forgot Password?
        </Link>
      </FormWrapper>
    </div>
  )
}
