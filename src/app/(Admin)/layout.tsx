"use client"

import HeaderContainer from "@/components/shared/HeaderContainer"
import SidebarContainer from "@/components/shared/SidebarContainer"
import { Layout } from "antd"
import { useState } from "react"
const { Content } = Layout

const AdminLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  return (
    <Layout hasSider>
      <SidebarContainer collapsed={sidebarCollapsed}></SidebarContainer>

      <Layout
        style={{
          maxHeight: "100dvh",
          overflow: "hidden",
          backgroundColor: "#000",
        }}
      >
        <HeaderContainer
          collapsed={sidebarCollapsed}
          setCollapsed={setSidebarCollapsed}
        ></HeaderContainer>

        <Content
          style={{
            maxHeight: "100dvh",
            overflow: "auto",
            padding: "24px",
            color: "white",
            fontFamily: "var(--font-poppins) !important",
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  )
}

export default AdminLayout
