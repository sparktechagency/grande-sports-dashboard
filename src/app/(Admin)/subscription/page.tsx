"use client"

import { lazy, useState } from "react"
import { Button, Divider, Flex } from "antd"
import { Icon } from "@iconify/react"
import SubscriptionPlanCard from "./_components/SubscriptionPlanCard"
import { useGetAllPackagesQuery } from "@/redux/apis/packageApi"
import Spinner from "@/components/skeletons/Spinner"
import ErrorComponent from "@/components/skeletons/ErrorComponent"

const CreateSubscriptionModal = lazy(
  () => import("./_components/CreateSubscriptionModal"),
)
const GiftSubscriptionModal = lazy(
  () => import("./_components/GiftSubscriptionModal"),
)

export interface ISubscriptionPlan {
  _id: string
  title: string
  subtitle: string
  billingCycle: string
  description: string[]
  price: number
  popularity: number
  isDeleted: boolean
  createdAt: string
  updatedAt: string
}

export default function Subscriptions() {
  const [showCreateSubscriptionModal, setShowCreateSubscriptionModal] =
    useState<boolean>(false)
  const [showGiftSubscriptionModal, setShowGiftSubscriptionModal] =
    useState<boolean>(false)

  const { data, isLoading, isError, error, refetch } =
    useGetAllPackagesQuery("")
  const packages = data?.data || []
  if (isLoading) return <Spinner />
  if (isError)
    return (
      <ErrorComponent
        message={(error as any)?.data?.message}
        onRetry={refetch}
        className="flex h-[65vh] items-center justify-center"
      />
    )

  return (
    <div className="bg-secondary min-h-[85vh] space-y-5 rounded-xl px-6 py-5 pb-0">
      <Flex justify="between" align="center">
        <h4 className="flex-1 text-2xl font-semibold">Subscription Plans</h4>

        <Flex align="center" justify="start" gap={10}>
          <Button
            type="primary"
            size="large"
            icon={<Icon icon="ic:baseline-add" />}
            onClick={() => setShowCreateSubscriptionModal(true)}
          >
            Create Subscription Plan
          </Button>
          <Button
            type="primary"
            size="large"
            icon={<Icon icon="tabler:gift" />}
            onClick={() => setShowGiftSubscriptionModal(true)}
          >
            Gift Subscription
          </Button>
        </Flex>
      </Flex>

      <Divider style={{ backgroundColor: "gray", marginTop: 12 }} />

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {packages?.map((subscriptionPlan: ISubscriptionPlan) => (
          <SubscriptionPlanCard
            key={subscriptionPlan._id}
            subscriptionPlan={subscriptionPlan}
          />
        ))}
      </div>

      {/* Modals */}
      <CreateSubscriptionModal
        open={showCreateSubscriptionModal}
        setOpen={setShowCreateSubscriptionModal}
      />
      <GiftSubscriptionModal
        open={showGiftSubscriptionModal}
        setOpen={setShowGiftSubscriptionModal}
      />
    </div>
  )
}
