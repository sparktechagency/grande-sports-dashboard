import { Popconfirm, PopconfirmProps } from "antd"

interface CustomConfirmProps extends PopconfirmProps {
  children: React.ReactNode
}

export default function CustomConfirm({
  children,
  title,
  description,
  onConfirm,
  okText = "Yes",
  cancelText = "No",
}: CustomConfirmProps) {
  return (
    <Popconfirm
      title={title || "Delete"}
      description={description || "Are you sure you want to do it?"}
      onConfirm={onConfirm}
      okText={okText}
      cancelText={cancelText}
    >
      {children}
    </Popconfirm>
  )
}
