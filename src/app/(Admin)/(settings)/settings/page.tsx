import { Icon } from "@iconify/react"
import Link from "next/link"

export const metadata = {
  title: "Settings",
  description: "Admin settings page",
}

interface SettingsLink {
  key: string
  label: string
  href: string
}

const SETTINGS_LINKS: SettingsLink[] = [
  {
    key: "profile-information",
    label: "Admin Profile",
    href: "profile",
  },
  {
    key: "privacy-policy",
    label: "Privacy Policy",
    href: "privacy-policy",
  },
  {
    key: "terms-conditions",
    label: "Terms & Conditions",
    href: "terms-conditions",
  },
  {
    key: "about-us",
    label: "About Us",
    href: "about-us",
  },
]

export default async function SettingsPage() {
  return (
    <div className="space-y-5">
      {SETTINGS_LINKS.map((item) => (
        <Link
          key={item.key}
          href={item.href}
          className="flex-center-between !bg-primary hover:!bg-primary/90 rounded-lg p-5 text-lg !text-white !transition-all !duration-300 !ease-in-out"
        >
          <span>{item.label}</span>

          <Icon icon="ant-design:right-outlined" height={20} width={20} />
        </Link>
      ))}
    </div>
  )
}
