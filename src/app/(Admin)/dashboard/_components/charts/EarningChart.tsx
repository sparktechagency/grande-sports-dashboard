"use client"
import { DatePicker } from "antd"
import dayjs from "dayjs"
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts"

interface EarningChartProps {
  data: {
    month: string
    amount: number
  }[]
  setSelectedEarningYear: React.Dispatch<React.SetStateAction<string>>
}

const EarningChart = ({ data, setSelectedEarningYear }: EarningChartProps) => {
  return (
    <div className="bg-secondary w-full rounded-xl p-6 text-white xl:w-1/2">
      <div className="mb-10 flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Earnings Overview</h1>

        <DatePicker
          onChange={(_, dateString) =>
            setSelectedEarningYear(dateString as string)
          }
          picker="year"
          defaultValue={dayjs()}
          className="!font-poppins !border-none !py-1.5"
        />
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <AreaChart
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
              <stop offset="30%" stopColor="var(--primary)" stopOpacity={1} />
              <stop
                offset="100%"
                stopColor="var(--primary)"
                stopOpacity={0.4}
              />
            </linearGradient>
          </defs>

          <XAxis
            tickMargin={10}
            axisLine={false}
            tickLine={true}
            tick={{ fill: "white" }}
            dataKey="month"
            tickFormatter={(month) => {
              return data.length > 6 ? month.slice(0, 3) : month
            }}
            interval={0}
            padding={{ left: 0, right: 0 }}
          />

          <YAxis
            tickMargin={20}
            axisLine={false}
            tickLine={false}
            tick={{ fill: "white" }}
          />

          <CartesianGrid opacity={0.19} stroke="#fff" strokeDasharray="3 3" />

          <Tooltip
            formatter={(value) => [`Monthly Earning: $${value}`]}
            contentStyle={{
              color: "black",
              fontWeight: "500",
              borderRadius: "5px",
              border: "0",
            }}
            itemStyle={{ color: "var(--primary)" }}
          />

          <Area
            activeDot={{ fill: "var(--primary)" }}
            type="monotone"
            dataKey="amount"
            strokeWidth={0}
            stroke="var(--primary)"
            fill="url(#color)"
            fillOpacity={1}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}

export default EarningChart
