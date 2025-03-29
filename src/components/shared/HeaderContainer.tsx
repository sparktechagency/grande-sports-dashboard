"use client"

import { Dropdown, Flex } from "antd"
import Image from "next/image"
import Link from "next/link"
import userAvatar from "@/assets/images/admin.jpg"
import { usePathname } from "next/navigation"
import { Layout } from "antd"
import { Icon } from "@iconify/react"
const { Header } = Layout

interface HeaderContainerProps {
  collapsed: boolean
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>
}

interface Notification {
  id: number
  message: string
  time: string
}

// Dummy Notification Data
const notifications: Notification[] = [
  {
    id: 1,
    message: "A new post was made in the community",
    time: "Sat, 12:30pm",
  },
  {
    id: 2,
    message: "A Payment was made to id: #OYLD4353",
    time: "Oct 24, 12:30pm",
  },
  {
    id: 3,
    message: "New video upload was successful",
    time: "Fri, 12:30pm",
  },
]

const notificationMenu = notifications.map((notification) => ({
  key: notification.id,
  label: (
    <div className="p-2 text-start">
      <div className="flex items-center gap-x-3">
        <Icon
          icon="solar:bell-outline"
          height={26}
          width={26}
          color="var(--primary)"
        />
        <div className="flex flex-col items-start">
          <p className="text-sm font-medium">{notification.message}</p>
          <p className="text-primary">{notification.time}</p>
        </div>
      </div>
    </div>
  ),
}))

export default function HeaderContainer({
  collapsed,
  setCollapsed,
}: HeaderContainerProps) {
  const pathname = usePathname()
  const navbarTitle = pathname.split("/")[1]

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
        <Dropdown
          menu={{ items: notificationMenu }}
          trigger={["click"]}
          className="header-notification-dropdown"
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
        </Dropdown>

        {/* User */}
        <Link
          href={"/profile"}
          className="hover:text-primary-blue group flex items-center gap-x-2 text-black"
        >
          <Image
            src={userAvatar}
            alt="Admin avatar"
            width={52}
            height={52}
            className="border-primary rounded-full border-2 p-0.5 group-hover:border"
          />

          <h4 className="hover:text-primary text-lg font-semibold text-white">
            Miguel
          </h4>
        </Link>
      </Flex>
    </Header>
  )
}
