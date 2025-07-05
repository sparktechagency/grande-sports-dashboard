"use client"

import TopLoader from "@/components/TopLoader"
import mainTheme from "@/theme/mainTheme"
import { AntdRegistry } from "@ant-design/nextjs-registry"
import { ConfigProvider } from "antd"
import { Bounce, ToastContainer } from "react-toastify"
import { Provider as ReduxProvider } from "react-redux"
import { store } from "@/redux/store"

const Provider: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <ConfigProvider theme={mainTheme}>
      <ReduxProvider store={store}>
        <AntdRegistry>{children}</AntdRegistry>
      </ReduxProvider>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
        style={{
          fontWeight: 500,
        }}
      />

      <TopLoader />
    </ConfigProvider>
  )
}

export default Provider
