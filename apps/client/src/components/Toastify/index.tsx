import Button from "@/components/Button"
import { ToastContainer, type TypeOptions } from "react-toastify"
import "react-toastify/dist/ReactToastify.min.css"
import styles from "./toastify.module.scss"

const Toastify = () => {
  const renderIcon = (type: TypeOptions) => {
    switch (type) {
      case "success":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="2em"
            viewBox="0 -960 960 960"
            width="2em"
          >
            <path d="m424-296 282-282-56-56-226 226-114-114-56 56 170 170Zm56 216q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Z" />
          </svg>
        )
      case "warning":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="2em"
            viewBox="0 -960 960 960"
            width="2em"
          >
            <path d="m40-120 440-760 440 760H40Zm442.784-118q14.216 0 23.716-9.617 9.5-9.617 9.5-23.833 0-14.216-9.617-23.716-9.617-9.5-23.833-9.5-14.217 0-23.716 9.617-9.5 9.617-9.5 23.833 0 14.216 9.617 23.716 9.616 9.5 23.833 9.5Zm-33.45-114H516v-216h-66.666v216Z" />
          </svg>
        )
      case "error":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="2em"
            viewBox="0 -960 960 960"
            width="2em"
          >
            <path d="M330-120 120-330v-300l210-210h300l210 210v300L630-120H330Zm30-193.333 120-120.001 120 120.001L646.667-360 526.666-480l120.001-120L600-646.667 480-526.666 360-646.667 313.333-600l120.001 120-120.001 120L360-313.333Z" />
          </svg>
        )
      default:
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="2em"
            viewBox="0 -960 960 960"
            width="2em"
          >
            <path d="M448.667-280h66.666v-240h-66.666v240Zm31.321-316q15.012 0 25.179-9.966 10.166-9.967 10.166-24.7 0-15.3-10.155-25.65-10.155-10.35-25.166-10.35-15.012 0-25.179 10.35-10.166 10.35-10.166 25.65 0 14.733 10.155 24.7Q464.977-596 479.988-596Zm.189 516q-82.822 0-155.666-31.5t-127.178-85.833Q143-251.667 111.5-324.56 80-397.454 80-480.333q0-82.88 31.5-155.773Q143-709 197.333-763q54.334-54 127.227-85.5Q397.454-880 480.333-880q82.88 0 155.773 31.5Q709-817 763-763t85.5 127Q880-563 880-480.177q0 82.822-31.5 155.666T763-197.456q-54 54.21-127 85.833Q563-80 480.177-80Z" />
          </svg>
        )
    }
  }

  const getButtonClrType = (type: TypeOptions) => {
    if (type === "info" || type === "default") return

    if (type === "error") return "danger" as const

    return type
  }

  const getClassType = (type: TypeOptions | undefined): string => {
    switch (type) {
      case "success":
        return styles._success
      case "warning":
        return styles._warning
      case "error":
        return styles._danger
      default:
        return ""
    }
  }

  return (
    <ToastContainer
      position="bottom-right"
      limit={3}
      theme="dark"
      icon={({ type }) => (
        <span className={styles.icon}>{renderIcon(type)}</span>
      )}
      toastClassName={(props) =>
        props?.defaultClassName +
        " " +
        styles.toast +
        " " +
        getClassType(props?.type)
      }
      bodyClassName={styles.body}
      progressClassName={styles.progress}
      closeButton={({ closeToast, type }) => (
        <div className={styles.close}>
          <Button isIcon onClick={closeToast} clrType={getButtonClrType(type)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="1.5em"
              viewBox="0 -960 960 960"
              width="1.5em"
            >
              <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
            </svg>
          </Button>
        </div>
      )}
    />
  )
}
export default Toastify
