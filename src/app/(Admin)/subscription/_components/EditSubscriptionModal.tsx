import { FieldValues, SubmitHandler } from "react-hook-form"
import { ISubscriptionPlan } from "../page"
import ModalWrapper from "@/components/ModalWrapper"
import UInput from "@/components/form-components/UInput"
import USelect from "@/components/form-components/USelect"
import { billingCycleOptions } from "./CreateSubscriptionModal"
import FormWrapper from "@/components/form-components/FormWrapper"
import { Button } from "antd"
import UTextArea from "@/components/form-components/UTextArea"
import { useUpdatePackageMutation } from "@/redux/apis/packageApi"
import handleMutation from "@/utils/handleMutation"

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
  const [updatePackage, { isLoading }] = useUpdatePackageMutation()
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if (typeof data.description === "string")
      data.description = data.description.split(",")
    data.price = Number(data.price)
    handleMutation(
      { id: subscriptionPlan._id, payload: data },
      updatePackage,
      "Updating subscription...",
      () => {
        setOpen(false)
      },
    )
  }

  if (!subscriptionPlan) {
    return null
  }

  return (
    <ModalWrapper open={open} setOpen={setOpen}>
      <FormWrapper defaultValues={subscriptionPlan} onSubmit={onSubmit}>
        <UInput
          name="title"
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
        <UTextArea
          name="description"
          label="Description"
          placeholder="Enter features. Separated by comma"
        />

        <Button
          type="primary"
          htmlType="submit"
          className="w-full"
          size="large"
          loading={isLoading}
        >
          {isLoading ? "Updating..." : "Update"}
        </Button>
      </FormWrapper>
    </ModalWrapper>
  )
}
