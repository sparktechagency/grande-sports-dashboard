"use client"

import {
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ComposedChart,
  Line,
} from "recharts"
import { DatePicker } from "antd"
import dayjs from "dayjs"
import {
  NameType,
  Payload,
  ValueType,
} from "recharts/types/component/DefaultTooltipContent"

interface UsersChartProps {
  data: {
    month: string
    count: number
  }[]
  setSelectedUserYear: React.Dispatch<React.SetStateAction<string>>
}

const UsersChart = ({ data, setSelectedUserYear }: UsersChartProps) => {
  return (
    <div className="bg-secondary w-full rounded-xl p-6 text-white xl:w-1/2">
      <div className="mb-10 flex items-center justify-between gap-2 lg:flex-wrap xl:flex-nowrap">
        <h1 className="text-2xl font-bold">Users Overview</h1>

        <div className="space-x-3">
          <DatePicker
            onChange={(_, dateString) => {
              setSelectedUserYear(dateString as string)
            }}
            picker="year"
            defaultValue={dayjs()}
            className="!font-poppins !border-none !py-1.5"
          />
        </div>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <ComposedChart
          data={data}
          margin={{
            top: 0,
            right: 0,
            left: 0,
            bottom: 0,
          }}
          barSize={20}
        >
          <XAxis
            dataKey="month"
            tickFormatter={(month) => {
              return data.length > 6 ? month.slice(0, 3) : month
            }}
            scale="point"
            padding={{ left: 10, right: 20 }}
            tickMargin={5}
            tickLine={true}
            tick={{ fill: "white" }}
            axisLine={false}
            interval={0}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tickMargin={20}
            tick={{ fill: "white" }}
          />

          <Tooltip
            content={({ payload, label }) => {
              if (!payload || payload.length === 0) return null

              // Extract unique values
              const uniqueValues: Array<Payload<ValueType, NameType>> = []
              payload.forEach((entry) => {
                if (!uniqueValues.some((item) => item.value === entry.value)) {
                  uniqueValues.push(entry)
                }
              })

              return (
                <div className="space-y-1.5 rounded-md bg-white p-3 shadow-md">
                  <p className="font-semibold text-black">{label}</p>
                  {uniqueValues.map((entry, index) => (
                    <p key={index} style={{ color: entry.color }}>
                      Monthly Joined Users: {entry.value}
                    </p>
                  ))}
                </div>
              )
            }}
          />

          <CartesianGrid
            opacity={0.2}
            horizontal={true}
            vertical={false}
            stroke="#fff"
            strokeDasharray="3 3"
          />

          <Bar
            barSize={25}
            radius={30}
            background={false}
            dataKey="count"
            fill="var(--primary)"
          />

          <Line type="monotone" dataKey="count" stroke="#305fa166" />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  )
}

export default UsersChart
