"use client"

import { Form, Input, Button } from "antd"
import { Icon } from "@iconify/react"
import { Loader } from "lucide-react"
import { useEffect, useState } from "react"
import { useAppSelector } from "@/redux/hooks"
import { selectUser } from "@/redux/slices/authSlice"
import { useSocket } from "@/redux/hooks/useSocket"

interface MessageFormProps {
  chatId: string
  receiverId: string
}

export default function MessageForm({ receiverId }: MessageFormProps) {
  const [isMessageSending, setIsMessageSending] = useState(false)
  const [form] = Form.useForm()
  const user = useAppSelector(selectUser)

  const socket = useSocket()
  useEffect(() => {
    if (socket) {
      // Connect socket if not already connected
      if (!socket.connected) {
        socket.connect()
      }

      socket.on("connect", () => {
        console.log("Socket connected")
      })
      socket.on("disconnect", () => {
        console.log("Socket disconnected")
      })

      return () => {
        socket.off("connect")
        socket.off("disconnect")
        // Do not disconnect socket here to maintain connection across components
      }
    }
  }, [socket])

  /** submit ------------------------------------------------------------ */
  const handleSendMessage = ({ message }: { message: string }) => {
    setIsMessageSending(true)
    const text = message.trim()
    if (!text) return // double‑check (shouldn’t be possible)

    const payload = {
      text,
      receiver: receiverId,
      sender: user?._id || "",
    }

    // return console.log("Sending message:", JSON.stringify(payload))
    if (socket.connected) {
      form.resetFields()
      setIsMessageSending(false)
      socket.emit("send-message", payload)
    } else {
      setIsMessageSending(false)
      console.error("Socket not connected, message not sent")
    }
  }

  /** UI ---------------------------------------------------------------- */
  return (
    <Form
      form={form}
      onFinish={handleSendMessage}
      className="mt-10 flex w-full gap-x-4"
    >
      <Form.Item
        name="message"
        className="m-0 flex-grow"
        rules={[{ required: true, whitespace: true, message: " " }]}
      >
        <Input
          size="large"
          placeholder="Type a message"
          autoComplete="off"
          className="!rounded-full !px-4 !py-2"
        />
      </Form.Item>

      <Form.Item shouldUpdate noStyle>
        {() => {
          // disable if empty / only whitespace OR while loading
          const disabled =
            isMessageSending || !form.getFieldValue("message")?.trim()?.length

          return (
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              disabled={disabled}
              className={`disabled:!bg-primary !aspect-square !rounded-full !shadow-none disabled:!cursor-not-allowed disabled:!text-white disabled:!opacity-60`}
            >
              {isMessageSending ? (
                <Loader className="animate-spin" />
              ) : (
                <Icon icon="material-symbols:send" height={20} width={20} />
              )}
            </Button>
          )
        }}
      </Form.Item>
    </Form>
  )
}
