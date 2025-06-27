"use client"

import { Skeleton } from "antd"

export default function ProfileSkeleton() {
  return (
    <div className="mx-auto w-full px-5 lg:w-3/4 lg:px-0 2xl:w-1/2">
      {/* Profile Pic Section */}
      <section className="flex items-center gap-x-3">
        <Skeleton.Avatar className="!bg-white" active shape="circle" size={160} />

        <div className="space-y-2">
          <Skeleton.Input className="!bg-white" active size="large" style={{ width: 200 }} />
          <Skeleton.Input className="!bg-white" active size="small" style={{ width: 120 }} />
        </div>
      </section>

      {/* Tabs + Forms */}
      <section className="my-16">
        <Skeleton active paragraph={{ rows: 6 }} />
      </section>
    </div>
  )
}
