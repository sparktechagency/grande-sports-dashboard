"use client"

import { Icon } from "@iconify/react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { PropsWithChildren } from "react"

export default function SettingsLayout({ children }: PropsWithChildren) {
  const pathname = usePathname()

  return (
    <div className="p-5">
      {pathname !== "/settings" && (
        <Link href="/settings" className="flex-center-start mb-8 gap-x-2">
          <Icon
            icon="lucide:move-left"
            height={16}
            width={16}
            className="mb-1"
          />{" "}
          Settings
        </Link>
      )}

      {children}
    </div>
  )
}
