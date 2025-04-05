/* eslint-disable @typescript-eslint/no-explicit-any */
import { toast } from "react-toastify"

const catchAsync = async (fn: () => Promise<any>) => {
  try {
    await fn()
  } catch (error: any) {
    toast.error(
      error?.message || error?.data?.message || "Something Went Wrong!",
    )
    return error
  }
}

export default catchAsync
