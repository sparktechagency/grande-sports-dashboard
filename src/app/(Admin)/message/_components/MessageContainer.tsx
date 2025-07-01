"use client"

import Image from "next/image"
import userImg from "@/assets/images/message/user.png"
import user2Img from "@/assets/images/message/user2.jpg"
import UserCard from "./ChatCard"
import { Button } from "antd"
import { Input } from "antd"
import { Icon } from "@iconify/react/dist/iconify.js"
import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import ReceivedMessage from "./ReceivedMessage"
import OwnerMsgCard from "./OwnerMsgCard"

export const dummyChats = [
  { img: userImg, name: "Alice Martin", latestMsg: "Let’s sync tomorrow." },
  { img: userImg, name: "Ben Carter", latestMsg: "Got the files, thanks!" },
  { img: userImg, name: "Clara Lee", latestMsg: "Call me when you’re free." },
  { img: userImg, name: "Derek Chan", latestMsg: "Sure, I’m in." },
  { img: userImg, name: "Eva Gomez", latestMsg: "Love the new design!" },
  { img: userImg, name: "Finn Harper", latestMsg: "Almost done with it." },
  { img: userImg, name: "Grace Liu", latestMsg: "Let’s review together." },
  { img: userImg, name: "Hassan Malik", latestMsg: "That’s awesome news!" },
  { img: userImg, name: "Ivy Thompson", latestMsg: "All set for launch." },
  { img: userImg, name: "Jack Nguyen", latestMsg: "Ping me anytime." },
  { img: userImg, name: "Kira Patel", latestMsg: "See you on Monday." },
  { img: userImg, name: "Leo Zhang", latestMsg: "Sent you the notes." },
]

const { Search } = Input

const MessageContainer = () => {
  const params = useSearchParams()
  const router = useRouter()
  const [activeChat, setActiveChat] = useState(0)
  useEffect(() => {
    const activeChat = params.get("activeChat")
    setActiveChat(Number(activeChat))
  }, [params])
  const handleChangeActiveChat = (idx: number) => {
    router.push(`/message?activeChat=${idx}`)
    setActiveChat(idx)
  }

  const activeChatData = dummyChats[activeChat]
  return (
    <div className="lg:mx-auto">
      <div
        className="bg-secondary relative z-10 flex max-h-[85vh] flex-col overflow-y-hidden rounded-xl !px-8 py-6 text-white shadow-lg lg:flex-row"
        style={{
          borderTop: "8px solid var(--primary)",
          borderTopLeftRadius: "1rem",
          borderTopRightRadius: "1rem",
        }}
      >
        {/* left */}
        <div className="pr-8 lg:w-[30%] lg:border-r lg:border-gray-300">
          <div className="gray-300 flex items-end gap-x-5 border-b border-gray-300 py-4">
            <h4 className="text-2xl font-bold">Messages</h4>
            <p className="pb-1 font-semibold">12</p>
          </div>

          <div className="mx-auto mt-4 mb-10">
            {/* Search box */}
            <Search
              placeholder="Search messages..."
              onSearch={(value) => console.log(value)}
              size="large"
              style={{
                width: "100%",
              }}
              allowClear
            />

            {/* users list - TODO: Use dynamic data */}
            <div className="scroll-hide mt-4 max-h-[85vh] space-y-4 overflow-y-scroll pb-44">
              {dummyChats.map((chat, idx) => (
                <div onClick={() => handleChangeActiveChat(idx)} key={idx}>
                  <UserCard chat={chat} active={activeChat === idx} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* right */}
        <div className="flex flex-col justify-between lg:flex-grow lg:px-8">
          <div className="flex items-center justify-between border-b border-gray-300 pb-1">
            <div className="flex items-center gap-x-3">
              <div className="w-[60px]">
                <Image
                  src={activeChatData.img}
                  alt="user image"
                  className="aspect-square w-full rounded-full"
                />
              </div>

              <div className="lg:flex-grow">
                <h3 className="text-xl font-semibold">{activeChatData.name}</h3>

                <div className="mt-1 flex items-center gap-x-2">
                  {/* Active/Online Indicator */}
                  <div className="h-2 w-2 rounded-full bg-green-500" />
                  <p className="border-t-black">Online</p>
                </div>
              </div>
            </div>

            <button className="flex items-center gap-x-2">
              <Icon
                icon="icomoon-free:blocked"
                height={20}
                width={20}
                color="#d55758"
              />
              <p className="text-xl">Block</p>
            </button>
          </div>

          <div className="max-h-full space-y-8 overflow-hidden pt-8">
            <div className="flex items-start gap-x-4">
              <Image
                src={userImg}
                alt="user's image"
                className="h-[50px] w-[50px] rounded-full"
              />
              <div className="max-w-[50%] space-y-3 overflow-hidden">
                <ReceivedMessage message={"omg, this is amazing"} />
                <ReceivedMessage message={"Lorem ipsum dolor sit amet"} />
                <ReceivedMessage
                  message={
                    "omg, thi perspiciatis consectetur mollitia laboriosam itaque enim officia aut nemo quibusdam?"
                  }
                />
              </div>
            </div>

            <div className="flex flex-row-reverse items-start gap-x-4">
              <Image
                src={user2Img}
                alt="user's image"
                className="h-[50px] w-[50px] rounded-full"
              />
              <div className="flex max-w-[50%] flex-col items-end space-y-3">
                <OwnerMsgCard message={"How are you?"} />
                <OwnerMsgCard
                  message={
                    "Lorem ipsum dolor sit... I'll be there in 2 mins ⏰ "
                  }
                />
              </div>
            </div>

            <div className="flex items-start gap-x-4">
              <Image
                src={userImg}
                alt="user's image"
                className="h-[50px] w-[50px] rounded-full"
              />
              <div className="max-w-[50%] space-y-3">
                <ReceivedMessage message={"omg, this is amazing"} />
                <ReceivedMessage message={"Lorem ipsum dolor sit amet"} />
                <ReceivedMessage
                  message={
                    "omg, thi perspiciatis consectetur mollitia laboriosam itaque enim officia aut nemo quibusdam?"
                  }
                />
              </div>
            </div>
          </div>

          <div className="mt-10 flex w-full items-center gap-x-4">
            <Icon
              icon="grommet-icons:attachment"
              role="button"
              height={20}
              width={20}
              className="text-primary"
            />

            <div className="flex w-full items-center gap-x-4">
              <Input
                size="large"
                placeholder="Type a message"
                type="text"
                className="w-full !rounded-full border !px-4 !py-2"
              />

              <Button
                type="primary"
                size="large"
                className="!aspect-square !rounded-full !shadow-none"
              >
                <Icon icon="material-symbols:send" height={20} width={20} />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MessageContainer
