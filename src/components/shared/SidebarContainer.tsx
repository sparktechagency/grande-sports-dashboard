"use client"

import LogoSvg from "@/assets/logos/logo.svg"
import LogoSmallSvg from "@/assets/logos/logo-small.svg"
import { Menu } from "antd"
import Sider from "antd/es/layout/Sider"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { toast } from "react-toastify"
import Image from "next/image"
import { Icon } from "@iconify/react"
// import { logout } from '@/redux/features/authSlice'
// import { useDispatch } from 'react-redux'

interface SidebarContainerProps {
  collapsed: boolean
}

const SidebarContainer: React.FC<SidebarContainerProps> = ({ collapsed }) => {
  // const dispatch = useDispatch()
  const router = useRouter()

  const sidebarLinks = [
    {
      key: "dashboard",
      icon: <Icon icon="fluent-mdl2:b-i-dashboard" height={23} width={23} />,
      label: <Link href={"/dashboard"}>Dashboard</Link>,
    },
    {
      key: "users",
      icon: <Icon icon="uil:users-alt" height={26} width={26} />,
      label: <Link href={"/users"}>Users</Link>,
    },
    {
      key: "earning",
      icon: <Icon icon="tdesign:money" height={26} width={26} />,
      label: <Link href={"/earning"}>Earning</Link>,
    },
    {
      key: "subscription",
      icon: <Icon icon="ri:money-dollar-circle-line" height={26} width={26} />,
      label: "Subscription",
    },
    {
      key: "videos",
      icon: <Icon icon="tdesign:video" height={25} width={25} />,
      label: "Videos",
      children: [
        {
          key: "playlist",
          icon: <Icon icon="iconamoon:playlist-bold" height={26} width={26} />,
          label: <Link href={"/videos/playlist"}>Playlist</Link>,
        },
        {
          key: "upload",
          icon: <Icon icon="lets-icons:upload" height={26} width={26} />,
          label: <Link href={"/videos/upload"}>Upload Video</Link>,
        },
      ],
    },
    {
      key: "community",
      icon: <Icon icon="fontisto:slack" height={26} width={26} />,
      label: <Link href={"/community"}>Community</Link>,
    },
    {
      key: "message",
      icon: <Icon icon="mdi:message-text-outline" height={26} width={26} />,
      label: <Link href={"/message"}>Message</Link>,
    },
    {
      key: "settings",
      icon: <Icon icon="nrk:settings" height={26} width={26} />,
      label: <Link href={"/settings"}>Settings</Link>,
    },
    {
      key: "logout",
      icon: <Icon icon="hugeicons:logout-04" height={26} width={26} />,
      label: "Logout",
    },
  ]

  // Logout handler
  const onClick = (key: string) => {
    if (key === "logout") {
      // dispatch(logout())
      // router.refresh()
      router.push("/login")

      toast.success("Successfully Logged Out!")
    }
  }

  // Get current path for sidebar menu item `key`
  const currentPathname = usePathname()?.replace("/", "")

  return (
    <Sider
      width={320}
      theme="light"
      trigger={null}
      collapsible
      collapsed={collapsed}
      style={{
        paddingInline: `${!collapsed ? "10px" : "1px"}`,
        paddingBlock: "30px",
        backgroundColor: "var(--secondary)",
        maxHeight: "100dvh",
        height: "100dvh",
        overflow: "auto",
      }}
      className="scroll-hide"
    >
      <div className="mb-12 flex flex-col items-center justify-center gap-y-5">
        <Link href={"/"}>{collapsed ? <LogoSmall /> : <Logo />}</Link>
      </div>

      <Menu
        onClick={({ key }) => onClick(key)}
        defaultSelectedKeys={[currentPathname]}
        mode="inline"
        className="sidebar-menu !space-y-4 !border-none !bg-transparent"
        items={sidebarLinks}
        style={{ fontFamily: "var(--font-poppins)" }}
      />
    </Sider>
  )
}

const LogoSmall = () => {
  return (
    <Image
      src={LogoSmallSvg}
      alt="Logo of Grande Sports"
      width={50}
      height={50}
      className="object-cover object-center"
    />
  )
}

const Logo = () => {
  return (
    <Image
      src={LogoSvg}
      alt="Logo of Grande Sports"
      width={200}
      height={200}
      className="object-cover object-center"
    />
  )
}

export default SidebarContainer
