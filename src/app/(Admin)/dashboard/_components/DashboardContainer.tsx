"use client"

import CustomCountUp from "@/components/CustomCountUp"
import { Icon } from "@iconify/react/dist/iconify.js"
import { Flex } from "antd"
import { useState } from "react"
import UsersChart from "./charts/UsersChart"
import EarningChart from "./charts/EarningChart"
import RecentUserTable from "./RecentUserTable"

//! Dummy Chart Data - Remove in production
const usersData = [
  { month: "Jan", count: 100 },
  { month: "Feb", count: 120 },
  { month: "Mar", count: 90 },
  { month: "Apr", count: 110 },
  { month: "May", count: 130 },
  { month: "Jun", count: 150 },
  { month: "Jul", count: 140 },
  { month: "Aug", count: 160 },
  { month: "Sep", count: 180 },
  { month: "Oct", count: 170 },
  { month: "Nov", count: 190 },
  { month: "Dec", count: 200 },
]

const earningsData = [
  { month: "Jan", amount: 100 },
  { month: "Feb", amount: 120 },
  { month: "Mar", amount: 90 },
  { month: "Apr", amount: 110 },
  { month: "May", amount: 130 },
  { month: "Jun", amount: 150 },
  { month: "Jul", amount: 140 },
  { month: "Aug", amount: 160 },
  { month: "Sep", amount: 180 },
  { month: "Oct", amount: 170 },
  { month: "Nov", amount: 190 },
  { month: "Dec", amount: 200 },
]

const DashboardContainer = () => {
  const [selectedUserYear, setSelectedUserYear] = useState<string>(
    new Date().getFullYear().toString(),
  )
  const [selectedEarningYear, setSelectedEarningYear] = useState<string>(
    new Date().getFullYear().toString(),
  )

  console.log({ selectedEarningYear, selectedUserYear })

  // Dashboard Stats
  const dashboardStats = [
    {
      key: "users",
      label: "Total Users",
      value: 119,
      icon: "clarity:users-line",
    },
    {
      key: "videos",
      label: "Total Videos",
      value: 80,
      icon: "tdesign:video",
    },
    {
      key: "earnings",
      label: "Total Earning",
      value: 2599,
      icon: "ri:money-dollar-circle-line",
    },
  ]

  return (
    <div>
      {/* User Stats */}
      <section className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {dashboardStats?.map((stat) => (
          <Flex
            key={stat.key}
            align="center"
            justify="start"
            gap={20}
            className="bg-secondary rounded-xl !px-5 !py-7 text-white"
          >
            <div className="flex-center bg-primary aspect-square size-[90px] rounded-full text-white">
              <Icon icon={stat.icon} height={50} width={50} />
            </div>

            <div className="space-y-1">
              <p className="text-xl font-medium text-white/80">{stat.label}</p>

              <h2 className="text-4xl font-extrabold">
                {stat.key === "revenue" && "$"}
                <CustomCountUp start={0} end={stat?.value} />
              </h2>
            </div>
          </Flex>
        ))}
      </section>

      {/* Charts */}
      <section className="flex-center-between my-10 flex-col gap-6 xl:flex-row">
        <UsersChart
          data={usersData}
          setSelectedUserYear={setSelectedUserYear}
        />

        <EarningChart
          data={earningsData}
          setSelectedEarningYear={setSelectedEarningYear}
        />
      </section>

      {/* Recent Users Table */}
      <RecentUserTable />
    </div>
  )
}

export default DashboardContainer
