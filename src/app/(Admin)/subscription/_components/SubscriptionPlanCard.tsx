"use client"

import { Button, Flex } from "antd"
import { ISubscriptionPlan } from "../page"
import { Icon } from "@iconify/react/dist/iconify.js"
import { lazy, useState } from "react"
import CustomConfirm from "@/components/CustomConfirm"
import { useDeletePackageMutation } from "@/redux/apis/packageApi"
import handleMutation from "@/utils/handleMutation"

const EditSubscriptionModal = lazy(() => import("./EditSubscriptionModal"))

interface SubscriptionPlanCardProps {
  subscriptionPlan: ISubscriptionPlan
}

export default function SubscriptionPlanCard({
  subscriptionPlan,
}: SubscriptionPlanCardProps) {
  const [showEditSubscriptionModal, setShowEditSubscriptionModal] =
    useState<boolean>(false)

  // Delete subscription
  const [deletePackage] = useDeletePackageMutation()
  const deleteSubscriptionHandler = () => {
    handleMutation(
      subscriptionPlan?._id,
      deletePackage,
      "Subscription is being deleted...",
    )
  }

  return (
    <div className="flex w-full flex-col justify-between rounded-xl bg-[#303030] p-5 transition-shadow ease-in-out hover:shadow-xl">
      <div>
        <h3 className="text-xl font-medium">{subscriptionPlan?.title}</h3>

        <h1 className="mt-2 mb-5 text-4xl font-bold">
          ${subscriptionPlan?.price}/
          <span className="text-xl font-medium">
            {subscriptionPlan?.billingCycle}
          </span>
        </h1>

        <Flex align="start" vertical gap={8} style={{ marginBottom: "20px" }}>
          {subscriptionPlan?.description?.map((feature) => (
            <Flex key={feature} align="center" justify="start" gap={10}>
              <div className="bg-primary flex aspect-square size-5 items-center justify-center rounded-full p-1">
                <Icon icon="mingcute:check-fill" className="text-black" />
              </div>
              <span className="text-base text-[#BCBCBC]">{feature}</span>
            </Flex>
          ))}
        </Flex>
      </div>

      <Flex align="center" justify="space-between" gap={16}>
        <Button
          type="primary"
          style={{ width: "100%" }}
          onClick={() => setShowEditSubscriptionModal(true)}
        >
          Edit
        </Button>

        <CustomConfirm
          title="Delete Subscription"
          description="Are you sure you want to delete this subscription?"
          onConfirm={deleteSubscriptionHandler}
        >
          <Button variant="solid" color="danger" style={{ width: "100%" }}>
            Delete
          </Button>
        </CustomConfirm>
      </Flex>

      {/* Modals */}
      <EditSubscriptionModal
        subscriptionPlan={subscriptionPlan}
        open={showEditSubscriptionModal}
        setOpen={setShowEditSubscriptionModal}
      />
    </div>
  )
}
