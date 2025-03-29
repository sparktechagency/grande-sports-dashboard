"use client"

import { Form, FormItemProps, Input, InputProps } from "antd"
import { Controller } from "react-hook-form"

interface UInputProps {
  name: string
  label?: string
  labelStyles?: React.CSSProperties
}

const UInput = ({
  type,
  name,
  label,
  size,
  placeholder,
  disabled = false,
  labelStyles = {},
  className,
  suffix,
  style,
  max,
  min,
  required = true,
  step = "any",
}: UInputProps & InputProps & FormItemProps) => {
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
          required={required}
        >
          {type === "password" ? (
            <Input.Password
              {...field}
              type={type}
              id={name}
              size={size}
              placeholder={placeholder}
              className={className}
            />
          ) : (
            <Input
              {...field}
              type={type}
              id={name}
              size={size}
              placeholder={placeholder}
              disabled={disabled}
              className={className}
              suffix={suffix}
              style={style}
              max={max}
              min={min}
              step={step}
            />
          )}
        </Form.Item>
      )}
    />
  )
}

export default UInput
