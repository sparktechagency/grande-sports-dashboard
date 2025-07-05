export default function envConfig() {
  if (typeof window !== "undefined") {
    return {
      nodeEnv: process.env.NEXT_PUBLIC_NODE_ENV,
    }
  }
}
