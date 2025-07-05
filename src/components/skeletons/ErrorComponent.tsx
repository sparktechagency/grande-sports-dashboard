import { Button } from "antd"
import { AlertCircle } from "lucide-react"

interface ErrorMessageProps {
  message?: string
  onRetry: () => void
  className?: string
}

export default function ErrorComponent({
  message = "Oops! Something went wrong. Please try again.",
  onRetry,
  className = "!bg-transparent",
}: ErrorMessageProps) {
  return (
    <div
      className={`flex min-w-full flex-col items-center justify-center rounded-lg !bg-transparent p-6 ${className}`}
      style={{ backgroundColor: "#1a1a1a" }}
    >
      {/* Error Icon */}
      <AlertCircle className="mb-4 h-12 w-12 text-[#CA2A30]" />

      {/* Error Message */}
      <p className="mb-4 text-center text-gray-400">{message}</p>

      {/* Retry Button */}
      <Button
        onClick={onRetry}
        className="!bg-primary hover:!bg-primary/90 !border-primary rounded-lg !text-white !transition-all !duration-300 !ease-in-out"
      >
        Retry
      </Button>
    </div>
  )
}
