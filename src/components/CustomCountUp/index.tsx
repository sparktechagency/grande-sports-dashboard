"use client"

import CountUp, { CountUpProps } from "react-countup"

const CustomCountUp = ({ start, end, duration, ...props }: CountUpProps) => {
  return (
    <CountUp
      {...props}
      start={start || 0}
      end={end}
      duration={duration || 10}
      separator=","
    />
  )
}

export default CustomCountUp
