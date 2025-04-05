import { ThemeConfig } from "antd"

const mainTheme: ThemeConfig = {
  token: {
    colorPrimary: "#067A3A",
    colorInfo: "#067A3A",
    colorError: "#ca0b00",
    fontFamily: "var(--font-poppins)",
  },

  components: {
    Menu: {
      itemBg: "transparent",
      itemColor: "#ffffff",
      itemHoverBg: "var(--primary)",
      itemSelectedBg: "var(--primary)",
      itemSelectedColor: "#ffffff",
      iconSize: 17,
      subMenuItemBg: "rgba(0,0,0,0.3)",
      colorBgElevated: "rgb(0,0,0)",
    },

    Table: {
      headerBg: "var(--primary)",
      headerSplitColor: "white",
      headerColor: "rgb(248, 250, 252)",
      colorBgContainer: "var(--primary-50)",
      cellFontSize: 16,
      colorText: "white",
      borderColor: "rgba(255, 255, 255, 0.18)",
      headerFilterHoverBg: "transparent",
      rowHoverBg: "var(--primary-30)",
      filterDropdownMenuBg: "var(--primary)",
      filterDropdownBg: "var(--secondary)",
    },

    Button: {
      colorPrimary: "var(--primary)",
      colorError: "var(--danger)",
    },

    Input: {
      colorBorder: "#a2a2a3",
      activeBorderColor: "var(--primary)",
      controlHeight: 38,
      colorBgContainer: "transparent",
      colorText: "white",
      colorTextPlaceholder: "lightGray",
      colorTextDisabled: "gray",
      colorIcon: "#fff",
      colorIconHover: "gray",
    },
    Select: {
      colorBorder: "#a2a2a3",
      colorText: "#fff",
      colorBgContainer: "transparent",
      colorTextPlaceholder: "lightGray",
    },

    DatePicker: {
      controlHeight: 40,
      colorBorder: "var(--secondary)",
      colorText: "#000",
    },

    Modal: {
      contentBg: "var(--secondary)",
      headerBg: "var(--secondary)",
      footerBg: "var(--secondary)",
      titleColor: "#fff",
      colorText: "#fff",
      colorIcon: "#fff",
      colorIconHover: "var(--danger)",
    },
    Form: {
      labelColor: "#fff",
      colorText: "#fff",
      colorTextDisabled: "gray",
    },

    Pagination: {
      itemActiveBg: "var(--primary)",
      itemBg: "var(--secondary)",
      colorText: "#fff",
      colorPrimary: "#fff",
    },

    Tabs: {
      colorText: "#fff",
    },
  },
}

export default mainTheme
