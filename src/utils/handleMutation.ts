import { toast } from "react-toastify"

const handleMutation = async (
  data: object | string,
  mutationFunc: any,
  loadingTxt: string,
  onSuccess?: unknown,
  onFailure?: unknown
) => {
  const toastId = toast.loading(loadingTxt)

  try {
    const res = await mutationFunc(data).unwrap()

    if (res?.success) {
      toast.update(toastId, {
        render: res?.message || "Operation successful",
        type: "success",
        isLoading: false,
        autoClose: 3000,
      })
      if (typeof onSuccess === "function") {
        onSuccess(res)
      }
    } else {
      toast.update(toastId, {
        render: res?.message || "Operation failed",
        type: "error",
        isLoading: false,
        autoClose: 300,
      })
      if (typeof onFailure === "function") {
        onFailure(res)
      }
    }
  } catch (error: any) {
    let errorMessage = "Something went wrong!"
    if (error.status === "PARSING_ERROR") {
      errorMessage =
        "Server returned invalid data. Please try again or contact support."
    } else if (error.data?.message) {
      errorMessage = error.data.message
    }

    toast.update(toastId, {
      render: errorMessage,
      type: "error",
      isLoading: false,
      autoClose: 3000,
    })

    console.log("api error: ", error)
    if (typeof onFailure === "function") {
      onFailure(error)
    }
  }
}

export default handleMutation
