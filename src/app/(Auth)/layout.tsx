"use client"

import logo from "@/assets/logos/logo.svg"
import { Icon } from "@iconify/react"
import { ConfigProvider } from "antd"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { PropsWithChildren } from "react"

export default function AuthLayout({ children }: PropsWithChildren) {
  const pathName = usePathname()

  return (
    <ConfigProvider
      theme={{
        components: {
          Form: {
            labelColor: "#000",
            colorText: "#000",
          },
          Input: {
            colorText: "#000",
            colorIcon: "lightgray",
          },
        },
      }}
    >
      <main className="flex-center from-secondary to-primary h-screen w-full bg-gradient-to-br">
        <div className="mx-auto lg:w-1/3 2xl:w-[28%]">
          <Image
            src={logo}
            alt="Logo of Grande Sports"
            height={250}
            width={250}
            priority
            className="mx-auto block"
          />

          <div className="mt-5 w-full rounded-xl bg-white">{children}</div>

          {!pathName?.includes("login") && (
            <Link
              href="/auth/login"
              className="flex-center-start mt-5 gap-x-2 text-sm text-white/80 hover:text-white"
            >
              <Icon icon="lucide:move-left" height={18} width={18} /> Back to
              login
            </Link>
          )}
        </div>
      </main>
    </ConfigProvider>
  )
}
