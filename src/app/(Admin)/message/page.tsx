"use client"
import dynamic from "next/dynamic"

const MessageContainer = dynamic(
  () => import("./_components/MessageContainer"),
  {
    ssr: false, // Disable SSR
  },
)

export default function Message() {
  return <MessageContainer />
}
