import FormWrapper from "@/components/form-components/FormWrapper"
import UInput from "@/components/form-components/UInput"
import USelect from "@/components/form-components/USelect"
import ModalWrapper from "@/components/ModalWrapper"
import { Button } from "antd"
import { FieldValues, SubmitHandler } from "react-hook-form"

interface CreateSubscriptionModalProps {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

//! Dummy
export const billingCycleOptions = ["Monthly", "Quarterly", "Yearly"].map(
  (option) => ({
    value: option,
    label: option,
  }),
)

export default function CreateSubscriptionModal({
  open,
  setOpen,
}: CreateSubscriptionModalProps) {
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data)
  }

  return (
    <ModalWrapper
      open={open}
      setOpen={setOpen}
      title="Create Subscription"
      className="!bg-secondary"
    >
      <FormWrapper onSubmit={onSubmit}>
        <UInput
          name="name"
          label="Subscription Name"
          placeholder="Enter subscription name"
          required={true}
        />
        <USelect
          name="billingCycle"
          label="Billing Cycle"
          placeholder="Select billing cycle"
          required={true}
          options={billingCycleOptions}
        />
        <UInput
          type="number"
          name="price"
          label="Price"
          placeholder="Enter price"
          required={true}
        />

        <Button
          type="primary"
          htmlType="submit"
          className="w-full"
          size="large"
        >
          Submit
        </Button>
      </FormWrapper>
    </ModalWrapper>
  )
}
