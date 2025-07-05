import spinnerImg from "@/assets/images/spinner.svg"
import Image from "next/image"

const Spinner = ({
  size = 145,
  className,
}: {
  size?: number
  className?: string
}) => {
  return (
    <div className={`flex h-[65vh] items-center justify-center ${className}`}>
      <Image src={spinnerImg} alt="Spinner" width={size} height={size} />
    </div>
  )
}

export default Spinner
