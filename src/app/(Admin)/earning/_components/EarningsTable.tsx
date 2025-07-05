"use client"

import { Col, Flex, Row, Table, TableProps, Tag, Tooltip, Input } from "antd"
import { Icon } from "@iconify/react"
import dayjs from "dayjs"
import { useState } from "react"
import CustomAvatar from "@/components/CustomAvatar"
import { formatString } from "@/utils/formatString"
import copyToClipboard from "@/utils/copyToClipboard"
import Spinner from "@/components/skeletons/Spinner"
import ErrorComponent from "@/components/skeletons/ErrorComponent"
import { useGetAllEarningsQuery } from "@/redux/apis/earningApi"

const { Search } = Input

export default function EarningsTable() {
  const [showFormattedTnxId, setShowFormattedTnxId] = useState(true)
  const [searchText, setSearchText] = useState("")
  const currentDate = new Date()
  console.log("currentDate", currentDate)
  const [page, setPage] = useState(1)
  const limit = 10

  const { data, isLoading, isError, error, refetch } = useGetAllEarningsQuery({
    page,
    limit,
    searchTerm: searchText,
  })

  const earningData = data?.data || []
  const meta = data?.meta || {}
  const total = meta.total || 0

  const columns: TableProps<any>["columns"] = [
    {
      title: "Serial",
      dataIndex: "_id",
      render: (_value, _record, index) => `${(page - 1) * limit + index + 1}`,
    },
    {
      title: "Paid By",
      dataIndex: "user",
      render: (user) => (
        <Flex align="center" gap={8}>
          <CustomAvatar src={user?.photoUrl} name={user?.name} size={35} />
          <p>{user?.name}</p>
        </Flex>
      ),
    },
    {
      title: "Email",
      dataIndex: "user",
      render: (user) => user?.email,
    },
    {
      title: "Amount",
      dataIndex: "amount",
      render: (value) => `$${value}`,
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (value) => (
        <Tag color="green" className="text-sm capitalize">
          {value}
        </Tag>
      ),
    },
    {
      title: "Tnx ID",
      dataIndex: "tranId",
      render: (value) => (
        <Flex align="center" gap={8}>
          <Tag
            color="magenta"
            className="text-sm"
            onClick={() => setShowFormattedTnxId(!showFormattedTnxId)}
            role="button"
          >
            {showFormattedTnxId
              ? formatString.formatTransactionId(value)
              : value}
          </Tag>
          <Tooltip title="Copy Transaction ID">
            <Icon
              icon="prime:copy"
              height={20}
              width={20}
              role="button"
              onClick={() => copyToClipboard(value)}
            />
          </Tooltip>
        </Flex>
      ),
    },
    {
      title: "Subscription Type",
      dataIndex: "subscription",
      render: (subscription) => (
        <Tag color="geekblue">
          {subscription?.package.billingCycle || "N/A"}
        </Tag>
      ),
    },
    {
      title: "Date",
      dataIndex: "createdAt",
      render: (value) => dayjs(value).format("MMM D YYYY, h:mm A"),
    },
  ]

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
    <div className="bg-secondary min-h-[85vh] space-y-5 rounded-xl p-5 pb-0">
      <Flex justify="between" align="center" style={{ marginBottom: "1rem" }}>
        <h4 className="flex-1 text-2xl font-semibold">Earnings Overview</h4>
        <Flex align="center" gap={12}>
          <Search
            placeholder="Search by Payment ID..."
            allowClear
            onSearch={(value) => setSearchText(value)}
            size="large"
            style={{ width: 300 }}
          />
          {/* <DatePicker onChange={onMonthChange} picker="month" size="large" /> */}
        </Flex>
      </Flex>

      <Row gutter={16}>
        <Col span={6}>
          <Flex
            align="center"
            gap={14}
            className="bg-primary w-full rounded-lg !px-4 !py-3.5 text-white"
          >
            <Icon icon="ph:arrows-left-right-fill" width="23px" height="23px" />
            <Flex gap={10}>
              <h4 className="text-lg font-semibold">Today&apos;s Earnings</h4>
              <h4 className="text-lg font-bold">
                ${earningData?.todayEarning || 0}
              </h4>
            </Flex>
          </Flex>
        </Col>

        <Col span={6}>
          <Flex
            align="center"
            gap={14}
            className="bg-primary w-full rounded-lg !px-4 !py-3.5 text-white"
          >
            <Icon icon="ph:arrows-left-right-fill" width="23px" height="23px" />
            <Flex gap={10}>
              <h4 className="text-lg font-semibold">Total Earnings</h4>
              <h4 className="text-lg font-bold">
                ${earningData?.totalEarning || 0}
              </h4>
            </Flex>
          </Flex>
        </Col>
      </Row>

      <Table
        columns={columns}
        dataSource={earningData?.earningList || []}
        loading={isLoading}
        rowKey="_id"
        scroll={{ x: "100%" }}
        pagination={
          total > limit
            ? {
                pageSize: limit,
                current: page,
                total,
                onChange: (page) => setPage(page),
              }
            : false
        }
      />
    </div>
  )
}
