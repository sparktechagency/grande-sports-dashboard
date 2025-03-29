import { FieldValues, SubmitHandler } from "react-hook-form"
import { ISubscriptionPlan } from "../page"
import ModalWrapper from "@/components/ModalWrapper"
import UInput from "@/components/form-components/UInput"
import USelect from "@/components/form-components/USelect"
import { billingCycleOptions } from "./CreateSubscriptionModal"
import FormWrapper from "@/components/form-components/FormWrapper"
import { Button } from "antd"

interface EditSubscriptionModalProps {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  subscriptionPlan: ISubscriptionPlan
}

export default function EditSubscriptionModal({
  open,
  setOpen,
  subscriptionPlan,
}: EditSubscriptionModalProps) {
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data)
  }

  if (!subscriptionPlan) {
    return null
  }

  return (
    <ModalWrapper open={open} setOpen={setOpen}>
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
