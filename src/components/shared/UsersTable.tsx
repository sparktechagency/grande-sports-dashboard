"use client"

import { Table, TableProps } from "antd"
import { Tooltip } from "antd"
import { Tag } from "antd"
import { useState } from "react"
import getTagColor from "@/utils/getTagColor"
import { Icon } from "@iconify/react"
import dayjs from "dayjs"
import CustomConfirm from "@/components/CustomConfirm"
import CustomAvatar from "@/components/CustomAvatar"
import { Flex, Input } from "antd"
import UserProfileModal from "./UserProfileModal"
import {
  useGetAllUsersQuery,
  useUpdateUserStatusMutation,
} from "@/redux/apis/userApi"
import ErrorComponent from "../skeletons/ErrorComponent"
import handleMutation from "@/utils/handleMutation"
const { Search } = Input

export interface IUser {
  _id: string
  name: string
  email: string
  photoUrl: string
  status: "active" | "blocked"
  id: string
  createdAt: string
}

const UsersTable = ({
  limit = 10,
  pagination = true,
  heading,
}: {
  limit?: number
  pagination?: boolean
  heading?: string
}) => {
  const [searchText, setSearchText] = useState("")
  const [showProfileModal, setShowProfileModal] = useState(false)
  const [selectedUser, setSelectedUser] = useState<IUser>()
  const [page, setPage] = useState(1)
  const params = {
    searchTerm: searchText,
    limit,
    page,
  }

  // Block User
  const [updateStatus] = useUpdateUserStatusMutation()

  const handleBlockUser = async (
    userId: string,
    currentStatus: "active" | "blocked",
  ) => {
    const status = currentStatus === "active" ? "blocked" : "active"

    const payload = {
      userId,
      status,
    }
    handleMutation(payload, updateStatus, "Updating status...")
  }

  // Get Recent Users
  const { data, isLoading, isError, error, refetch } =
    useGetAllUsersQuery(params)
  const users = data?.data

  const meta = data?.meta
  if (isError)
    return (
      <ErrorComponent
        message={(error as any)?.data?.message}
        onRetry={refetch}
        className="flex h-[65vh] items-center justify-center"
      />
    )

  // =============== Table columns ===============
  const columns: TableProps<IUser>["columns"] = [
    {
      title: "Sr. No.",
      dataIndex: "key",
      render(value) {
        return <span>#{value}</span>
      },
    },
    {
      title: "Name",
      render: (_, record) => (
        <div className="flex-center-start gap-x-2">
          <CustomAvatar src={record?.photoUrl} size={40} name={record?.name} />
          <p className="font-medium">{record?.name}</p>
        </div>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Registered At",
      dataIndex: "createdAt",
      render: (value) => {
        return dayjs(value).format("DD MMM YYYY, hh:mm A")
      },
    },
    {
      title: "Status",
      dataIndex: "status",

      render: (value) => (
        <Tag color={getTagColor(value)} className="capitalize">
          {value}
        </Tag>
      ),
    },
    {
      title: "Action",
      render: (_, record) => (
        <div className="flex-center-start gap-x-3">
          <Tooltip title="Show Details">
            <button
              onClick={() => {
                setSelectedUser(record)
                setShowProfileModal(true)
              }}
            >
              <Icon
                icon="fa6-regular:eye"
                color="lightGreen"
                height={22}
                width={22}
              />

              <div className="sr-only">Show Details</div>
            </button>
          </Tooltip>

          <CustomConfirm
            title="Are you sure?"
            description="This user's status will be updated."
            onConfirm={() => handleBlockUser(record?._id, record?.status)}
          >
            <Tooltip
              title={
                record?.status === "active" ? "Block User" : "Unblock User"
              }
            >
              <Icon
                icon={
                  record?.status === "active"
                    ? "solar:user-block-rounded-linear"
                    : "solar:user-check-broken"
                }
                color={
                  record?.status === "active"
                    ? "var(--danger)"
                    : "var(--primary-green)"
                }
                height={22}
                width={22}
                role="button"
              />
              <div className="sr-only">Block User</div>
            </Tooltip>
          </CustomConfirm>
        </div>
      ),
    },
  ]

  return (
    <div className="bg-secondary h-fit space-y-5 rounded-xl p-5">
      <Flex justify="between" align="center">
        <h4 className="flex-1 text-2xl font-semibold">
          {heading || "User Management"}
        </h4>

        <Search
          placeholder="Search by user id, name or email..."
          onSearch={(value) => setSearchText(value)}
          size="large"
          style={{
            width: 300,
          }}
          allowClear
        />
      </Flex>

      <div className="my-5">
        <Table
          loading={isLoading}
          style={{ overflowX: "auto" }}
          columns={columns}
          dataSource={users}
          scroll={{ x: "100%" }}
          pagination={
            pagination && meta?.total > limit
              ? {
                  pageSize: limit,
                  current: page,
                  total: meta?.total,
                  onChange: (page) => {
                    setPage(page)
                  },
                }
              : false
          }
        ></Table>
      </div>

      {/* Profile Modal */}
      <UserProfileModal
        open={showProfileModal}
        setOpen={setShowProfileModal}
        user={selectedUser}
      />
    </div>
  )
}

export default UsersTable
