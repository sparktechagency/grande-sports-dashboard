import { Image, ImageProps } from "antd"
import placeholderImage from "@/assets/images/placeholder-image.webp"

interface CustomAvatarProps extends ImageProps {
  src?: string
  name?: string
  size?: number
}

export default function CustomAvatar({
  src,
  name = "Avatar",
  size = 24,
  ...props
}: CustomAvatarProps) {
  return (
    <Image
      {...props}
      src={src}
      alt={name}
      height={size}
      width={size}
      className="ring-primary/75 rounded-full object-cover object-center ring-2"
      fallback={placeholderImage?.src}
    />
  )
}
