"use client"

import CustomCountUp from "@/components/CustomCountUp"
import { Icon } from "@iconify/react/dist/iconify.js"
import { Flex } from "antd"
import { useState } from "react"
import UsersChart from "./charts/UsersChart"
import EarningChart from "./charts/EarningChart"
import { useGetMetaDataQuery } from "@/redux/apis/metaApi"
import Spinner from "@/components/skeletons/Spinner"
import ErrorComponent from "@/components/skeletons/ErrorComponent"
import UsersTable from "@/components/shared/UsersTable"

const DashboardContainer = () => {
  const [selectedUserYear, setSelectedUserYear] = useState<string>(
    new Date().getFullYear().toString(),
  )
  const [selectedEarningYear, setSelectedEarningYear] = useState<string>(
    new Date().getFullYear().toString(),
  )

  
  

  const params = {
    earning_year: selectedEarningYear,
    user_year: selectedUserYear,
  }
  const { data, isLoading, isError, error, refetch } =
    useGetMetaDataQuery(params)
  const metaData = data?.data
  const earningOverview = metaData?.earningOverview
  const userOverview = metaData?.userOverview

  if (isLoading) return <Spinner />
  if (isError)
    return (
      <ErrorComponent
        message={(error as any)?.data?.message}
        onRetry={refetch}
        className="flex h-[65vh] items-center justify-center"
      />
    )
  // Dashboard Stats
  const dashboardStats = [
    {
      key: "users",
      label: "Total Users",
      value: metaData?.totalUserCount || 0,
      icon: "clarity:users-line",
    },
    {
      key: "videos",
      label: "Total Videos",
      value: metaData?.totalVideos || 0,
      icon: "tdesign:video",
    },
    {
      key: "earnings",
      label: "Total Earning",
      value: metaData?.totalRevenue || 0,
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
          data={userOverview}
          setSelectedUserYear={setSelectedUserYear}
        />

        <EarningChart
          data={earningOverview}
          setSelectedEarningYear={setSelectedEarningYear}
        />
      </section>

      {/* Recent Users Table */}
      <UsersTable heading="Recent Users" limit={5} pagination={false} />
    </div>
  )
}

export default DashboardContainer
