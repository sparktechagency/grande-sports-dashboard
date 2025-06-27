"use client"

import { Form, Input, InputProps } from "antd"
import { Controller } from "react-hook-form"

interface UOtpInputProps {
  name: string
  label?: string
  labelStyles?: React.CSSProperties
}

const UOtpInput = ({
  // type,
  name,
  label,
  // size,
  // placeholder,
  // defaultValue,
  // disabled = false,
  labelStyles = {},
  // className,
  // suffix,
  // style,
  // max,
  // required,
}: UOtpInputProps & InputProps) => {
  return (
    <Controller
      name={name}
      render={({ field, fieldState: { error } }) => (
        <Form.Item
          label={
            Object.keys(labelStyles)?.length > 0 ? (
              <label style={labelStyles}>{label}</label>
            ) : (
              label
            )
          }
          validateStatus={error ? "error" : ""}
          help={error ? error.message : ""}
        >
          <Input.OTP size="large" length={4} {...field} />
        </Form.Item>
      )}
    />
  )
}

export default UOtpInput
