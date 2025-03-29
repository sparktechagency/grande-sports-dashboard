interface ReceiverMsgCardProps {
  message: string
}

const ReceiverMsgCard = ({ message }: ReceiverMsgCardProps) => {
  return (
    <div className="bg-primary rounded-3xl border px-3 py-2 text-white first-letter:max-w-max">
      <p className="text-primary-black">{message}</p>
    </div>
  )
}

export default ReceiverMsgCard
