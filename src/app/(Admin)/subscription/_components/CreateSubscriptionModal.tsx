import FormWrapper from "@/components/form-components/FormWrapper"
import UInput from "@/components/form-components/UInput"
import USelect from "@/components/form-components/USelect"
import UTextArea from "@/components/form-components/UTextArea"
import ModalWrapper from "@/components/ModalWrapper"
import { useAddPackageMutation } from "@/redux/apis/packageApi"
import handleMutation from "@/utils/handleMutation"
import { Button } from "antd"
import { FieldValues, SubmitHandler } from "react-hook-form"

interface CreateSubscriptionModalProps {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

//! Dummy
export const billingCycleOptions = ["monthly", "yearly"].map((option) => ({
  value: option,
  label: option,
}))

export default function CreateSubscriptionModal({
  open,
  setOpen,
}: CreateSubscriptionModalProps) {
  const [addPackage, { isLoading }] = useAddPackageMutation()
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    data.description = data.description.split(",")
    data.price = Number(data.price)
    handleMutation(data, addPackage, "Creating subscription...", () => {
      setOpen(false)
    })
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
          {isLoading ? "Submitting..." : "Submit"}
        </Button>
      </FormWrapper>
    </ModalWrapper>
  )
}
