"use client"

import { Modal, ModalProps } from "antd"

interface ModalWrapperProps {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  children: React.ReactNode
  title?: string
  className?: string
}

export default function ModalWrapper({
  open,
  setOpen,
  children,
  title,
  ...props
}: ModalWrapperProps & ModalProps) {
  return (
    <Modal
      centered
      open={open}
      footer={null}
      onCancel={() => {
        setOpen(false)
      }}
      title={title}
      {...props}
    >
      {children}
    </Modal>
  )
}
