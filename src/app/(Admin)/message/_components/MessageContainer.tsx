"use client"

import Image from "next/image"
import userImg from "@/assets/images/message/user.png"
import user2Img from "@/assets/images/message/user2.jpg"
import UserCard from "./UserCard"
import ReceiverMsgCard from "./ReceiverMsgCard"
import OwnerMsgCard from "./OwnerMsgCard"
import { Button } from "antd"
import { Input } from "antd"
import { Icon } from "@iconify/react/dist/iconify.js"

const { Search } = Input

const MessageContainer = () => {
  return (
    <div className="lg:mx-auto">
      <div
        className="relative z-10 flex flex-col rounded-xl bg-white !px-8 py-6 shadow-lg lg:flex-row"
        style={{
          borderTop: "8px solid var(--primary)",
          borderTopLeftRadius: "1rem",
          borderTopRightRadius: "1rem",
        }}
      >
        {/* left */}
        <div className="pr-8 lg:w-[30%] lg:border-r lg:border-gray-300">
          <div className="gray-300 flex items-end gap-x-5 border-b border-gray-300 py-4 text-black">
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
            <div className="scroll-hide mt-4 max-h-[80vh] space-y-4 overflow-auto">
              {Array.from({ length: 6 }).map((_, idx) => (
                <UserCard
                  key={idx}
                  user={{
                    img: userImg,
                    name: "Elmer Laverty",
                    latestMsg: "omg, this is amazing 🔥",
                  }}
                  active={idx === 1 ? true : false}
                />
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
                  src={userImg}
                  alt="user image"
                  className="aspect-square w-full rounded-full"
                />
              </div>

              <div className="lg:flex-grow">
                <h3 className="text-xl font-semibold text-black">
                  Elmer Laverty
                </h3>

                <div className="mt-1 flex items-center gap-x-2">
                  {/* Active/Online Indicator */}
                  <div className="h-2 w-2 rounded-full bg-green-500" />
                  <p className="border-t-black text-black">Online</p>
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
              <p className="text-xl text-black">Block</p>
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
                <ReceiverMsgCard message={"omg, this is amazing"} />
                <ReceiverMsgCard message={"Lorem ipsum dolor sit amet"} />
                <ReceiverMsgCard
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
                <ReceiverMsgCard message={"omg, this is amazing"} />
                <ReceiverMsgCard message={"Lorem ipsum dolor sit amet"} />
                <ReceiverMsgCard
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
                className="w-full !rounded-full border !px-4 !py-2 !text-black"
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
