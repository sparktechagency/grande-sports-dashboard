import { FormItemProps, Select, SelectProps } from "antd"
import { Form } from "antd"
import { Controller } from "react-hook-form"

interface USelectProps {
  name: string
  label?: string
  labelStyles?: React.CSSProperties
}

const USelect = ({
  name,
  label,
  placeholder,
  options,
  size,
  defaultValue,
  showSearch,
  mode,
  filterOption,
  style,
  labelStyles = {},
  required = true,
}: USelectProps & SelectProps & FormItemProps) => {
  return (
    <Controller
      name={name}
      render={({
        field: { onChange, value: fieldValue },
        fieldState: { error },
      }) => (
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
          <Select
            mode={mode}
            filterOption={filterOption}
            showSearch={showSearch}
            value={fieldValue || defaultValue}
            size={size}
            options={options}
            onChange={onChange}
            placeholder={placeholder}
            style={{ ...style, height: style?.height || "35px" }}
          />
        </Form.Item>
      )}
    />
  )
}

export default USelect
