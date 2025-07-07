import { useEffect, useState } from "react"
import { io } from "socket.io-client"
import { useAppSelector } from "."
import { selectToken } from "../slices/authSlice"

export const useSocket = () => {
  const [socket, setSocket] = useState<any>(null)
  const token = useAppSelector(selectToken)

  useEffect(() => {
    const newSocket = io(process.env.NEXT_PUBLIC_SOCKET_URL, {
      auth: { token: token },
      transports: ["websocket", "polling"],
      autoConnect: false,
      reconnection: true,
    })

    newSocket.connect()
    setSocket(newSocket)

    return () => {
      if (newSocket.connected) {
        newSocket.disconnect()
      }
    }
  }, [token])

  return socket
}
