"use client"

import { lazy, useState } from "react"
import { Button, Divider, Flex } from "antd"
import { Icon } from "@iconify/react"
import SubscriptionPlanCard from "./_components/SubscriptionPlanCard"

const CreateSubscriptionModal = lazy(
  () => import("./_components/CreateSubscriptionModal"),
)
const GiftSubscriptionModal = lazy(
  () => import("./_components/GiftSubscriptionModal"),
)

export interface ISubscriptionPlan {
  key: number
  name: string
  price: number
  features: string[]
  mostPopular: boolean
}

//! Dummy subscriptions data
const subscriptionPlans: ISubscriptionPlan[] = [
  {
    key: 1,
    name: "Monthly",
    price: 30,
    features: [
      "Get special notifications",
      "Get tournament updates",
      "Create specific profile",
    ],
    mostPopular: true,
  },
  {
    key: 1,
    name: "Yearly",
    price: 1200,
    features: [
      "Get special notifications",
      "Get tournament updates",
      "Create specific profile",
      "Enjoy premium features",
    ],
    mostPopular: false,
  },
]

export default function Subscriptions() {
  const [showCreateSubscriptionModal, setShowCreateSubscriptionModal] =
    useState<boolean>(false)
  const [showGiftSubscriptionModal, setShowGiftSubscriptionModal] =
    useState<boolean>(false)

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

      <Flex gap={16} align="stretch" justify="between">
        {subscriptionPlans?.map((subscriptionPlan) => (
          <SubscriptionPlanCard
            key={subscriptionPlan.key}
            subscriptionPlan={subscriptionPlan}
          />
        ))}
      </Flex>

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
