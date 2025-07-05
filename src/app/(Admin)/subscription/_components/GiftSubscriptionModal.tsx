import FormWrapper from "@/components/form-components/FormWrapper"
import USelect from "@/components/form-components/USelect"
import ModalWrapper from "@/components/ModalWrapper"
import Spinner from "@/components/skeletons/Spinner"
import {
  useGetAllPackagesQuery,
  useGiftSubscriptionMutation,
} from "@/redux/apis/packageApi"
import { useGetAllUsersQuery } from "@/redux/apis/userApi"
import handleMutation from "@/utils/handleMutation"
import { Button } from "antd"
import { SetStateAction } from "react"
import { FieldValues, SubmitHandler } from "react-hook-form"

interface GiftSubscriptionModalProps {
  open: boolean
  setOpen: React.Dispatch<SetStateAction<boolean>>
}

export default function GiftSubscriptionModal({
  open,
  setOpen,
}: GiftSubscriptionModalProps) {
  const { data, isLoading } = useGetAllUsersQuery("")
  const users = data?.data
  const usersOptions = users?.map((user: any) => ({
    value: user.email,
    label: user.name,
  }))

  const { data: packageRes, isLoading: packageLoading } =
    useGetAllPackagesQuery("")
  const packageOptions = packageRes?.data?.map((item: any) => ({
    value: item._id,
    label: item.title,
  }))

  const [sendGift, { isLoading: isSendingGift }] = useGiftSubscriptionMutation()
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    handleMutation(data, sendGift, "Sending gift...", () => {
      setOpen(false)
    })
  }

  return (
    <ModalWrapper open={open} setOpen={setOpen} title="Gift Subscription">
      {isLoading || packageLoading ? (
        <Spinner size={110} className="h-fit py-18" />
      ) : (
        <FormWrapper onSubmit={onSubmit}>
          <USelect
            name="email"
            label="Select User"
            placeholder="Select a user to gift subscription"
            options={usersOptions}
            showSearch
            allowClear
            required
          />

          <USelect
            name="package"
            label="Select Package"
            placeholder="Select a Package"
            options={packageOptions}
            required
          />
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            className="w-full"
            loading={isSendingGift}
          >
            {isSendingGift ? "Sending..." : "Send"}
          </Button>
        </FormWrapper>
      )}
    </ModalWrapper>
  )
}
