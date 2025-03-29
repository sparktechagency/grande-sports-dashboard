"use client"

import { Table, TableProps } from "antd"
import { Tooltip } from "antd"
import { Tag } from "antd"
import { useState } from "react"
// import ProfileModal from "@/components/SharedModals/ProfileModal"
import getTagColor from "@/utils/getTagColor"
import { Icon } from "@iconify/react"
// import { useGetAllUserQuery, useUpdateUserMutation } from "@/redux/api/userApi"
import dayjs from "dayjs"
// import catchAsync from "@/utils/catchAsync"
// import { toast } from "react-toastify"
import CustomConfirm from "@/components/CustomConfirm"
import CustomAvatar from "@/components/CustomAvatar"
// import { usePathname, useRouter, useSearchParams } from "next/navigation"
// import useQueryString from "@/hooks/useQueryString"
import userImg from "@/assets/images/user.png"
import { Flex, Input } from "antd"
import UserProfileModal from "./UserProfileModal"
const { Search } = Input

export interface IUser {
  key: number
  name: string
  age: number
  address: string
  email: string
  gender: "male" | "female" | "other"
  contactNumber: string
  status: string
  createdAt: string
  photoUrl: string
  primaryPosition: string
  secondaryPosition: string
}

//! Dummy user data
const users: IUser[] = Array.from({ length: 10 }).map((_, index) => ({
  key: index + 1,
  name: "Edward Liu",
  age: 32,
  address: "London, Park Lane no. 2",
  email: "ZwNQk@example.com",
  contactNumber: "1234567890",
  status: "active",
  gender: "male",
  createdAt: dayjs().format("YYYY-MM-DD"),
  photoUrl: userImg?.src,
  primaryPosition: "GoalKeeper",
  secondaryPosition: "Rotations",
}))

const UsersTable = () => {
  // const router = useRouter()
  // const currentPathname = usePathname()
  // const { createQueryString } = useQueryString()
  const [searchText, setSearchText] = useState("")
  const [showProfileModal, setShowProfileModal] = useState(false)
  const [selectedUser, setSelectedUser] = useState<IUser>()

  // Get Recent Users
  // const { data: users, isLoading: isGetAllUsersLoading } = useGetAllUserQuery()

  // Block User
  // const [blockUser] = useUpdateUserMutation()

  // const handleBlockUser = async (userId, currentStatus) => {
  //   await catchAsync(async () => {
  //     const status = currentStatus === "active" ? "blocked" : "active"

  //     await blockUser({ userId, status }).unwrap()
  //     toast.success(
  //       currentStatus === "active"
  //         ? "User blocked successfully"
  //         : "User unblocked successfully",
  //     )
  //   })
  // }

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
      title: "Contact",
      dataIndex: "contactNumber",
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
            // onConfirm={() => handleBlockUser(record?._id, record?.status)}
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
    <div className="bg-secondary min-h-[85vh] space-y-5 rounded-xl p-5 pb-0">
      <Flex justify="between" align="center">
        <h4 className="flex-1 text-2xl font-semibold">User Management</h4>

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
          // loading={isGetAllUsersLoading}
          style={{ overflowX: "auto" }}
          columns={columns}
          dataSource={users}
          scroll={{ x: "100%" }}
          // pagination={{
          //   pageSize: 10,
          //   current: useSearchParams().get("page") || 1,
          //   onChange: (page, pageSize) => {
          //     router.push(
          //       currentPathname +
          //         "?" +
          //         createQueryString({
          //           page,
          //           pageSize,
          //         }),
          //     )
          //   },
          // }}
          rowKey={(record) => record?.key}
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
