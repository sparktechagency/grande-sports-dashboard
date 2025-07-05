"use client"

import { Form, Input, Button } from "antd"
import { Icon } from "@iconify/react"
import { Loader } from "lucide-react"
import { useSendMessageMutation } from "@/redux/apis/messageApi"
import handleMutation from "@/utils/handleMutation"

interface MessageFormProps {
  chatId: string
  receiverId: string
}

export default function MessageForm({ chatId, receiverId }: MessageFormProps) {
  const [form] = Form.useForm()
  const [sendMessage, { isLoading }] = useSendMessageMutation()

  /** submit ------------------------------------------------------------ */
  const handleFinish = ({ message }: { message: string }) => {
    const text = message.trim()
    if (!text) return // double‑check (shouldn’t be possible)

    const payload = {
      chat: chatId,
      text,
      receiver: receiverId,
    }

    handleMutation(payload, sendMessage, undefined, () => form.resetFields())
  }

  /** UI ---------------------------------------------------------------- */
  return (
    <Form
      form={form}
      onFinish={handleFinish}
      className="mt-10 flex w-full gap-x-4"
    >
      <Form.Item
        name="message"
        className="m-0 flex-grow"
        rules={[{ required: true, whitespace: true, message: " " }]} // keeps AntD happy
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
            isLoading || !form.getFieldValue("message")?.trim()?.length

          return (
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              disabled={disabled}
              className={`disabled:!bg-primary !aspect-square !rounded-full !shadow-none disabled:!cursor-not-allowed disabled:!text-white disabled:!opacity-60`}
            >
              {isLoading ? (
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
