import type { Metadata } from "next"
import { Poppins } from "next/font/google"
import localFont from "next/font/local"
import "./globals.css"
import "@ant-design/v5-patch-for-react-19"
import Provider from "@/lib/providers/Provider"

const poppins = Poppins({
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
})

const ramaGothic = localFont({
  src: "../assets/fonts/Rama-Gothic-Bold.woff",
  variable: "--font-rama-gothic",
})

export const metadata: Metadata = {
  title: {
    default: "Grande Sports Dashboard",
    template: "%s - Grande Sports Dashboard",
  },
  description: "Administrator Dashboard for Grande Sports",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
      </head>

      <body
        className={`${poppins.className} ${poppins.variable} ${ramaGothic.variable} !font-open-sans antialiased`}
      >
        <Provider>{children}</Provider>
      </body>
    </html>
  )
}
