"use client"

import Image from "next/image"
import { ConfigProvider, Tabs, Upload, message } from "antd"
import ChangePassForm from "./ChangePassForm"
import EditProfileForm from "./EditProfileForm"
import { Icon } from "@iconify/react"
import {
  useGetUserProfileQuery,
  useUpdateProfileMutation,
} from "@/redux/apis/userApi"
import ErrorComponent from "@/components/skeletons/ErrorComponent"
import Spinner from "@/components/skeletons/Spinner"
import { defaultAvatar } from "@/constant/global.constant"
import handleMutation from "@/utils/handleMutation"

export default function ProfileContainer() {
  const { data, isLoading, isError, error, refetch } =
    useGetUserProfileQuery("")
  const [uploadProfileImage, { isLoading: uploading }] =
    useUpdateProfileMutation()

  const profile = data?.data

  const tabItems = [
    {
      key: "editProfile",
      label: "Edit Profile",
      children: (
        <EditProfileForm
          name={profile?.name}
          email={profile?.email}
          contact={profile?.contact}
        />
      ),
    },
    {
      key: "changePassword",
      label: "Change Password",
      children: <ChangePassForm />,
    },
  ]

  const handleUpload = async (file: File) => {
    const formData = new FormData()
    formData.append("image", file)
    handleMutation(formData, uploadProfileImage, "Uploading...")
  }

  if (isLoading) return <Spinner />
  if (isError) {
    return (
      <ErrorComponent
        className="py-32"
        message={(error as any)?.data?.message}
        onRetry={refetch}
      />
    )
  }

  return (
    <ConfigProvider>
      <div className="mx-auto w-full px-5 lg:w-3/4 lg:px-0 2xl:w-1/2">
        {/* Profile pic */}
        <section className="flex-center gap-x-3">
          <div className="relative w-max">
            <Image
              src={profile?.photoUrl || defaultAvatar}
              alt="Admin avatar"
              width={400}
              height={400}
              className="border-primary aspect-square h-auto w-[160px] rounded-full border-2 p-1"
            />

            <Upload
              showUploadList={false}
              maxCount={1}
              accept="image/*"
              beforeUpload={(file) => {
                const isValid =
                  file.type.startsWith("image") && file.size / 1024 / 1024 < 5
                if (!isValid) {
                  message.error("Only image files under 5MB are allowed")
                  return Upload.LIST_IGNORE
                }

                handleUpload(file)
                return false // prevent default upload
              }}
            >
              <button
                className="flex-center bg-primary absolute right-2 bottom-7 aspect-square rounded-full p-2 text-white/95"
                disabled={uploading}
              >
                <Icon icon="lucide:image-plus" height={18} width={18} />
              </button>
            </Upload>
          </div>

          <div>
            <h3 className="text-3xl font-semibold">{profile?.name}</h3>
            <p className="text-primary-blue mt-1 text-lg font-medium">
              Administrator
            </p>
          </div>
        </section>

        {/* Profile Information Forms */}
        <section className="my-16">
          <Tabs defaultActiveKey="editProfile" centered items={tabItems} />
        </section>
      </div>
    </ConfigProvider>
  )
}
