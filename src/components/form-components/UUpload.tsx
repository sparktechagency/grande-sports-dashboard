import { TUploadFileType } from "@/types"
import { cn } from "@/utils/utils"
import { Icon } from "@iconify/react"
import { Upload, UploadProps } from "antd"
import { Controller, useFormContext } from "react-hook-form"
import { toast } from "react-toastify"

interface UUploadProps {
  name: string
  label?: string
  uploadTitle: string
  labelStyles?: React.CSSProperties
  fileType?: TUploadFileType
  fileSize?: number
  required?: boolean
  maxCount?: number
  borderClassName?: string
}

export default function UUpload({
  name,
  label,
  uploadTitle,
  maxCount = 1,
  labelStyles = {},
  fileList,
  fileType = "image", // now also supports "both"
  fileSize = 5, // default max 5MB
  required = true,
  borderClassName = "",
}: UUploadProps & UploadProps) {
  const { control } = useFormContext()

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={fileList}
      rules={{
        required: {
          value: required,
          message: `${label || uploadTitle} is required`,
        },
      }}
      render={({ field, fieldState: { error } }) => (
        <div className="mb-3">
          {label && (
            <label
              style={labelStyles}
              className="mb-2 flex items-center gap-x-1 font-medium"
            >
              {required && <span className="text-[#ff4d4f]">*</span>} {label}
            </label>
          )}

          <div
            className={cn(
              "flex-center scroll-hide h-32 w-full overflow-auto rounded-xl border-2 border-dashed border-[#a2a2a3]",
              borderClassName,
            )}
          >
            <Upload
              name={field.name}
              listType="picture"
              maxCount={maxCount}
              fileList={field.value || []}
              onChange={(info) => {
                field.onChange(info.fileList)
              }}
              multiple={maxCount > 1}
              beforeUpload={(file) => {
                const isValidSize = file.size / 1024 / 1024 < fileSize

                const isImage = file.type.startsWith("image")
                const isVideo = file.type.startsWith("video")

                const allowed =
                  fileType === "both"
                    ? isImage || isVideo
                    : fileType === "image"
                      ? isImage
                      : isVideo

                if (!allowed) {
                  toast.error(
                    `Only ${fileType === "both" ? "image or video" : fileType} files are allowed.`,
                  )
                  return Upload.LIST_IGNORE
                }

                if (!isValidSize) {
                  toast.error(`File size exceeds ${fileSize}MB!`)
                  return Upload.LIST_IGNORE
                }

                return true
              }}
              className="mx-auto flex !min-h-32 !w-full flex-col justify-center gap-y-2 !py-10 !text-white hover:!text-black"
            >
              <button
                type="button"
                className="!mx-auto flex w-max gap-x-2 rounded-md border border-black/10 bg-white px-4 py-2 font-medium !text-black shadow-sm transition-all duration-300 ease-in-out active:scale-95"
              >
                <Icon icon="lets-icons:upload-fill" height={20} width={20} />{" "}
                Upload {uploadTitle}
              </button>
            </Upload>
          </div>

          {error && <p className="text-danger text-sm">{error.message}</p>}
        </div>
      )}
    />
  )
}
