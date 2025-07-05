"use client"

import { Popover, Flex, Button } from "antd"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Layout } from "antd"
import { Icon } from "@iconify/react"
import { defaultAvatar } from "@/constant/global.constant"
import { useGetUserProfileQuery } from "@/redux/apis/userApi"
import {
  useDeleteAllNotificationsMutation,
  useGetNotificationsQuery,
} from "@/redux/apis/notificationApi"
import { useAppSelector } from "@/redux/hooks"
import { selectUser } from "@/redux/slices/authSlice"
import { format } from "date-fns"
import { useEffect, useState } from "react"
import Spinner from "../skeletons/Spinner"
import { socket } from "@/socket"
import handleMutation from "@/utils/handleMutation"
import { toast } from "react-toastify"

const { Header } = Layout

interface HeaderContainerProps {
  collapsed: boolean
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>
}

export default function HeaderContainer({
  collapsed,
  setCollapsed,
}: HeaderContainerProps) {
  const [deleteAll, { isLoading: isDeleting }] =
    useDeleteAllNotificationsMutation()
  const page = 1
  const [limit, setLimit] = useState(8)

  const {
    data: notificationRes,
    isLoading: isNotificationLoading,
    isError: isNotificationError,
    isFetching: isNotificationFetching,
  } = useGetNotificationsQuery({ page, limit })
  const notificationData = notificationRes?.data || []
  const meta = notificationRes?.meta || {}

  // set notifications in the state
  const [notifications, setNotifications] = useState(notificationData)
  console.log("notificationData:", notificationData)
  useEffect(() => {
    setNotifications(notificationData)
  }, [notificationData])
  // console.log("Notification Data:", notificationData)
  const pathname = usePathname()
  const navbarTitle = pathname.split("/")[1]
  const tokenUser = useAppSelector(selectUser)
  const { data } = useGetUserProfileQuery("", { skip: !tokenUser })
  const user = data?.data

  useEffect(() => {
    // Connect socket if not already connected
    if (!socket.connected) {
      socket.connect()
    }

    // Listen for real-time notification event
    socket.on(`notification::${user?._id}`, (newNotification) => {
      toast.info(newNotification.message, {
        autoClose: 12000,
      })
      console.log("Received real-time notification:", newNotification)
      setNotifications((prev: any) => [newNotification, ...prev])
    })

    socket.on("connect", () => {
      console.log("Socket connected")
    })
    socket.on("disconnect", () => {
      console.log("Socket disconnected")
    })

    return () => {
      socket.off(`notification::${user?._id}`)
      socket.off("connect")
      socket.off("disconnect")
      // Do not disconnect socket here to maintain connection across components
    }
  }, [user])

  const handleLoadMore = () => {
    setLimit((prevLimit) => prevLimit + limit)
  }

  const handleDeleteAll = async () => {
    handleMutation(undefined, deleteAll, "Deleting all notifications...")
  }

  const notificationContent = (
    <div style={{ maxHeight: "350px", overflowY: "auto", width: "300px" }}>
      {isNotificationLoading ? (
        <Spinner size={100} className="h-[270px]" />
      ) : isNotificationError ? (
        <p className="py-22 text-center text-xs text-red-500">
          Failed to load notifications
        </p>
      ) : notifications.length === 0 ? (
        <p className="py-22 text-center text-xs text-gray-400">
          No notifications
        </p>
      ) : (
        notifications.map((notification: any) => (
          <div
            key={notification.id}
            className="border-b border-gray-700 p-3 text-start"
          >
            <div className="flex items-center gap-x-3">
              <Icon
                icon="solar:bell-outline"
                height={26}
                width={26}
                color="var(--primary)"
              />
              <div className="flex flex-col items-start">
                <p className="text-sm font-medium">
                  {notification.message?.length > 25
                    ? `${notification.message.slice(0, 25)}...`
                    : notification.message}
                </p>
                <p className="text-primary text-xs">
                  {format(
                    new Date(notification.date || notification.createdAt),
                    "dd MMMM, yyyy",
                  )}
                </p>
              </div>
            </div>
          </div>
        ))
      )}
      {!isNotificationLoading &&
        !isNotificationError &&
        notifications.length !== 0 && (
          <div className="p-3">
            <Flex gap={8} justify="space-between">
              {meta?.totalPage > page && (
                <Button
                  type="primary"
                  onClick={handleLoadMore}
                  disabled={isNotificationFetching}
                  block
                >
                  {isNotificationFetching ? "Loading..." : "Load More"}
                </Button>
              )}
              <Button
                type="default"
                className="!bg-red-500 !text-white"
                onClick={handleDeleteAll}
                disabled={
                  isNotificationFetching ||
                  notifications.length === 0 ||
                  isDeleting
                }
                block
              >
                {isDeleting ? "Deleting..." : "Delete All"}
              </Button>
            </Flex>
          </div>
        )}
    </div>
  )

  return (
    <Header
      style={{
        backgroundColor: "var(--secondary)",
        color: "#fff",
        height: "80px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        paddingInline: 0,
        paddingRight: "40px",
        fontFamily: "var(--font-open-sans)",
      }}
    >
      <Flex align="center" justify="start" gap={10}>
        <button>
          <Icon
            icon="ri:menu-2-fill"
            height={28}
            width={28}
            strokeWidth={3}
            onClick={() => setCollapsed(!collapsed)}
          />
        </button>
        <h1 className="font-rama-gothic text-[40px] font-medium capitalize">
          {navbarTitle.length > 1
            ? navbarTitle.replaceAll("/", " ").replaceAll("-", " ")
            : "dashboard"}
        </h1>
      </Flex>
      <Flex align="center" justify="start" gap={10}>
        <Popover
          content={notificationContent}
          trigger="click"
          placement="bottomRight"
        >
          <button className="flex-center bg-primary relative aspect-square size-11 rounded-full !leading-none">
            <div className="absolute top-2 right-3 size-3 rounded-full bg-red-400" />
            <Icon
              icon="solar:bell-outline"
              height={26}
              width={26}
              color="#fff"
            />
          </button>
        </Popover>
        <Link
          href={"/profile"}
          className="hover:text-primary-blue group flex items-center gap-x-2 text-black"
        >
          <Image
            src={user?.photoUrl || defaultAvatar}
            alt="Admin avatar"
            width={52}
            height={52}
            className="border-primary rounded-full border-2 p-0.5 group-hover:border"
          />
          <h4 className="hover:text-primary text-lg font-semibold text-white">
            {user?.name?.split(" ")[0]}
          </h4>
        </Link>
      </Flex>
    </Header>
  )
}
