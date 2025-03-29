import FormWrapper from "@/components/form-components/FormWrapper"
import USelect from "@/components/form-components/USelect"
import ModalWrapper from "@/components/ModalWrapper"
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
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data)
  }

  return (
    <ModalWrapper open={open} setOpen={setOpen} title="Gift Subscription">
      <FormWrapper onSubmit={onSubmit}>
        <USelect
          name="name"
          label="Select User"
          placeholder="Select a user to gift subscription"
          options={[
            { value: "johnDoe", label: "johndoe@gmail.com" },
            { value: "johnDoe", label: "johndoe@gmail.com" },
            { value: "johnDoe", label: "johndoe@gmail.com" },
          ]}
          showSearch
          allowClear
          required
        />

        <USelect
          name="subscription"
          label="Select Subscription"
          placeholder="Select a subscription"
          options={[
            { value: "monthly", label: "Monthly" },
            { value: "quarterly", label: "Quarterly" },
            { value: "yearly", label: "Yearly" },
          ]}
          required
        />
        <Button
          type="primary"
          htmlType="submit"
          size="large"
          className="w-full"
        >
          Gift Now
        </Button>
      </FormWrapper>
    </ModalWrapper>
  )
}
