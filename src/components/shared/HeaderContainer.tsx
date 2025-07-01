"use client"

import { Popover, Flex } from "antd"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Layout } from "antd"
import { Icon } from "@iconify/react"
import { defaultAvatar } from "@/constant/global.constant"
import { useGetUserProfileQuery } from "@/redux/apis/userApi"
import { useAppSelector } from "@/redux/hooks"
import { selectUser } from "@/redux/slices/authSlice"
import { useGetNotificationsQuery } from "@/redux/apis/notificationApi"
import { format } from "date-fns"
import { useState } from "react"

const { Header } = Layout

interface HeaderContainerProps {
  collapsed: boolean
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>
}

export default function HeaderContainer({
  collapsed,
  setCollapsed,
}: HeaderContainerProps) {
  const [page, setPage] = useState(1)
  const limit = 5

  const { data: notificationRes, isFetching } = useGetNotificationsQuery({
    page,
    limit,
  })
  const notifications = notificationRes?.data || []

  const pathname = usePathname()
  const navbarTitle = pathname.split("/")[1]
  const tokenUser = useAppSelector(selectUser)
  const { data } = useGetUserProfileQuery("", { skip: !tokenUser })
  const user = data?.data

  const handleScroll = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
    const el = e.currentTarget
    const isBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 10
    if (isBottom && !isFetching) {
      setPage((prev) => prev + 1)
    }
  }

  const notificationContent = (
    <div
      style={{ maxHeight: "300px", overflowY: "auto", width: "300px" }}
      onScroll={handleScroll}
    >
      {notifications.map((notification: any) => (
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
              <p className="text-sm font-medium">{notification.message}</p>
              <p className="text-primary text-xs">
                {format(new Date(notification.date), "dd MMMM, yyyy")}
              </p>
            </div>
          </div>
        </div>
      ))}

      {isFetching && (
        <p className="py-2 text-center text-xs text-gray-400">
          Loading more...
        </p>
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
      {/* Collapse Icon */}
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

      {/* Right --- notification, user profile */}
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

        {/* User */}
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
