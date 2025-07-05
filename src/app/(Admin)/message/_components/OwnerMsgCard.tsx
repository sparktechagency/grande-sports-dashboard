interface OwnerMsgCardProps {
  message: string
}

const OwnerMsgCard = ({ message }: OwnerMsgCardProps) => {
  return (
    <div className="bg-primary rounded-md px-3 py-2 text-white first-letter:max-w-max">
      <p className="text-primary-black">{message}</p>
    </div>
  )
}

export default OwnerMsgCard
