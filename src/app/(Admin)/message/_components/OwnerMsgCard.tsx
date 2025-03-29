interface OwnerMsgCardProps {
  message: string
}

const OwnerMsgCard = ({ message }: OwnerMsgCardProps) => {
  return (
    <div className="max-w-max rounded-3xl border bg-black px-3 py-2">
      <p className="text-primaryWhite">{message}</p>
    </div>
  )
}

export default OwnerMsgCard
