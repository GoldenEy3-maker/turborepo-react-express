import { cls } from "@/utils/helpers"
import { Show, splitProps, type Component, type JSX } from "solid-js"
import styles from "./logo.module.scss"

type LogoProps = {
  isMinimized?: boolean
} & JSX.HTMLAttributes<HTMLDivElement>

const Logo: Component<LogoProps> = (props) => {
  const [splitedProps, restProps] = splitProps(props, ["isMinimized"])

  return (
    <div {...restProps} class={cls([restProps.class, styles.logo])}>
      <span>
        <svg
          width="48"
          height="54"
          viewBox="0 0 48 54"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M23.8605 0L43.5905 35.3063C44.8099 37.4884 42.4402 39.9183 40.2282 38.7541L23.8605 30.1395L7.49277 38.7541C5.28075 39.9183 2.91107 37.4884 4.13047 35.3063L23.8605 0Z"
            fill="#d1a9ef"
          />
          <path
            d="M23.8605 11.3024L43.5905 46.6087C44.8099 48.7908 42.4402 51.2207 40.2282 50.0565L23.8605 41.4419L7.49277 50.0565C5.28075 51.2207 2.91107 48.7908 4.13047 46.6087L23.8605 11.3024Z"
            fill="url(#paint0_linear_601_300)"
          />
          <defs>
            <linearGradient
              id="paint0_linear_601_300"
              x1="23.8605"
              y1="51.4884"
              x2="23.8605"
              y2="15.0698"
              gradientUnits="userSpaceOnUse"
            >
              <stop stop-color="#531881" />
              <stop offset="1" stop-color="#531881" stop-opacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </span>
      <Show when={!splitedProps.isMinimized}>
        <p>
          Work<b>flow</b>
        </p>
      </Show>
    </div>
  )
}

export default Logo
