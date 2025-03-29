import { Form, Input } from "antd"
import { TextAreaProps } from "antd/es/input"
import React from "react"
import { Controller } from "react-hook-form"
const { TextArea } = Input

interface UTextAreaProps {
  name: string
  label?: string
  labelStyles?: React.CSSProperties
  minRows?: number
}

export default function UTextArea({
  name,
  label,
  labelStyles = {},
  placeholder,
  maxLength,
  minRows = 5,
  style,
  required,
}: UTextAreaProps & TextAreaProps) {
  return (
    <Controller
      name={name}
      render={({ field, fieldState: { error } }) => (
        <Form.Item
          label={
            Object.keys(labelStyles)?.length > 0 ? (
              <label htmlFor={name} style={labelStyles}>
                {label}
              </label>
            ) : (
              label
            )
          }
          validateStatus={error ? "error" : ""}
          help={error ? error.message : ""}
          required={required}
        >
          <TextArea
            {...field}
            id={name}
            placeholder={placeholder}
            maxLength={maxLength}
            style={style}
            showCount={true}
            autoSize={{
              minRows: minRows,
            }}
          />
        </Form.Item>
      )}
    />
  )
}
