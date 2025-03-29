"use client"

import { Col, Flex, Row, TableProps, Tooltip } from "antd"
import { Tag } from "antd"
import { Table } from "antd"
import { Input } from "antd"
import { Icon } from "@iconify/react"
import { DatePicker } from "antd"
const { Search } = Input
import { formatString } from "@/utils/formatString"
import { useState } from "react"
// import getTagColor from "@/utils/getTagColor"
// import { useGetAllEarningsQuery } from "@/redux/api/earningsApi"
import CustomAvatar from "@/components/CustomAvatar"
import dayjs from "dayjs"
// import { usePathname, useRouter, useSearchParams } from "next/navigation"
// import useQueryString from "@/hooks/useQueryString"
import userImg from "@/assets/images/user.png"
import copyToClipboard from "@/utils/copyToClipboard"

interface IEarning {
  key: number
  user: {
    name: string
    email: string
    photoUrl: string
  }
  createdAt: string
  amount: number
  status: string
  tranId: string
}

interface EarningsData {
  todaysEarning: number
  totalEarning: number
  earnings: IEarning[]
}

//! Dummy Earnings Data
const earningsData: EarningsData = {
  todaysEarning: 100,
  totalEarning: 1000,
  earnings: Array.from({ length: 10 }).map((_, index) => ({
    key: index + 1,
    id: "#ghqRTawalH",
    user: {
      name: "Edward Liu",
      email: "ZwNQk@example.com",
      photoUrl: userImg?.src,
    },
    createdAt: dayjs().format("YYYY-MM-DD"),
    amount: 100,
    status: "completed",
    tranId: "pi_18908_unbxtehppb",
    subscriptionPlan: "Monthly",
  })),
}

export default function EarningsTable() {
  const [showFormattedTnxId, setShowFormattedTnxId] = useState(true)
  // const router = useRouter()
  // const currentPathname = usePathname()
  // const { createQueryString } = useQueryString()
  // const [searchText, setSearchText] = useState("")

  // Query params
  // const query = {}
  // if (searchText) {
  //   query["id"] = searchText
  // }

  // // Get all earnings
  // const { data: earningsRes, isLoading } = useGetAllEarningsQuery(query)
  // const earningsData = earningsRes?.data || []
  // const earningsMeta = earningsRes?.meta || {}

  // =============== Table columns ===============
  const columns: TableProps<IEarning>["columns"] = [
    {
      title: "Payment Id",
      dataIndex: "id",
    },
    {
      title: "Paid By",
      dataIndex: "user",
      render: (value) => {
        return (
          <Flex align="center" justify="start" gap={8}>
            <CustomAvatar src={value?.photoUrl} name={value?.name} size={35} />
            <p>{value?.name}</p>
          </Flex>
        )
      },
    },
    {
      title: "Email",
      dataIndex: "user",
      render: (value) => {
        return <span>{value?.email}</span>
      },
    },
    {
      title: "Amount",
      dataIndex: "amount",
      render: (value) => {
        return "$" + value
      },
    },
    {
      title: "Status",
      dataIndex: "status",

      filters: [
        {
          text: "Completed",
          value: "completed",
        },
        {
          text: "Pending",
          value: "pending",
        },
        {
          text: "Unpaid",
          value: "unpaid",
        },
      ],
      filterIcon: () => (
        <Icon
          icon="lsicon:filter-outline"
          height={22}
          width={22}
          color="#fff"
          className="flex items-start justify-start"
        />
      ),
      onFilter: (value, record) => record.status === value,
      render: (value) => (
        <Tag color={"green"} className="!text-sm capitalize">
          {value}
        </Tag>
      ),
    },

    {
      title: "Tnx Id",
      dataIndex: "tranId",
      render: (value) => (
        <Flex align="center" justify="start">
          <Tag
            color="magenta"
            className="!text-sm"
            onClick={() => setShowFormattedTnxId(!showFormattedTnxId)}
            role="button"
          >
            {showFormattedTnxId
              ? formatString.formatTransactionId(value)
              : value}
          </Tag>

          <Tooltip title="Copy Transaction Id">
            <Icon
              icon="prime:copy"
              height={20}
              width={20}
              role="button"
              onClick={() => copyToClipboard(value)}
            />
            <div className="sr-only">Copy Transaction Id</div>
          </Tooltip>
        </Flex>
      ),
    },
    {
      title: "Subscription Type",
      dataIndex: "subscriptionPlan",
      render: (value) => {
        return <Tag color={"geekblue"}>{value}</Tag>
      },
    },
    {
      title: "Date",
      dataIndex: "createdAt",
      render: (value) => {
        return dayjs(value).format("MMM D YYYY, h:mm A")
      },
    },

    // {
    //   title: "Action",
    //   render: () => {
    //     return <Button type="primary">View Details</Button>;
    //   },
    // },
  ]

  return (
    <div className="bg-secondary min-h-[85vh] space-y-5 rounded-xl p-5 pb-0">
      <Flex justify="between" align="center" style={{ marginBottom: "1rem" }}>
        <h4 className="flex-1 text-2xl font-semibold">Earnings Overview</h4>

        <Flex align="center" justify="start" gap={12}>
          <Search
            placeholder="Search by Payment Id..."
            // onSearch={(value) => setSearchText(value)}
            size="large"
            style={{
              width: 300,
            }}
            allowClear
          />

          <DatePicker picker="month" placeholder="Filter Month" size="large" />
        </Flex>
      </Flex>

      <Row gutter={16}>
        <Col span={6}>
          <Flex
            justify="start"
            gap={14}
            align="center"
            className="bg-primary w-full rounded-lg !px-4 !py-3.5 text-white"
          >
            <Icon icon="ph:arrows-left-right-fill" width="23px" height="23px" />

            <Flex align="center" gap={10}>
              <h4 className="text-lg font-semibold">Today&apos;s Earnings</h4>
              <h4 className="text-lg font-bold">
                $ {earningsData?.todaysEarning}
              </h4>
            </Flex>
          </Flex>
        </Col>

        <Col span={6}>
          <Flex
            justify="start"
            gap={14}
            align="center"
            className="bg-primary w-full rounded-lg !px-4 !py-3.5 text-white"
          >
            <Icon icon="ph:arrows-left-right-fill" width="23px" height="23px" />

            <Flex align="center" gap={10}>
              <h4 className="text-lg font-semibold">Total Earnings</h4>
              <h4 className="text-lg font-bold">
                $ {earningsData?.totalEarning}
              </h4>
            </Flex>
          </Flex>
        </Col>

        {/* <Col span={12}>
          <Flex justify="end" gap={14} align="center" className="h-full w-full">
            <DatePicker
              picker="month"
              placeholder="Filter Month"
              style={{ height: "45px" }}
            />
          </Flex>
        </Col> */}
      </Row>

      <Table
        style={{ overflowX: "auto" }}
        columns={columns}
        dataSource={earningsData?.earnings}
        scroll={{ x: "100%" }}
        // loading={isLoading}
        // pagination={{
        //   total: earningsMeta.total,
        //   pageSize: 10,
        //   current: useSearchParams().get("page") || 1,
        //   onChange: (page, pageSize) => {
        //     router.push(
        //       currentPathname + "?" + createQueryString({ page, pageSize }),
        //     )
        //   },
        // }}
      />
    </div>
  )
}
