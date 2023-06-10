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
          height="48"
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M0 39.364V8.56904C0 8.56904 1 30.8619 10 30.8619C19 30.8619 16.5 23.3619 24 23.431C31.5 23.5 29.5 30.8619 38 30.8619C46.5 30.8619 48 8.56904 48 8.56904V39.364L23.5522 48L0 39.364Z"
            fill="url(#paint0_linear_30_192)"
          />
          <path
            d="M48 8.56904L23.5522 0L0 8.56904C0 8.56904 1 30.8619 10 30.8619C19 30.8619 16.5 23.3619 24 23.431C31.5 23.5 29.5 30.8619 38 30.8619C46.5 30.8619 48 8.56904 48 8.56904Z"
            fill="url(#paint1_linear_30_192)"
          />
          <circle cx="24" cy="18" r="4" fill="url(#paint2_linear_30_192)" />
          <circle cx="24" cy="11" r="2" fill="url(#paint3_linear_30_192)" />
          <defs>
            <linearGradient
              id="paint0_linear_30_192"
              x1="23.9104"
              y1="48"
              x2="23.9104"
              y2="8.43515"
              gradientUnits="userSpaceOnUse"
            >
              <stop stop-color="#561686" />
              <stop offset="1" stop-color="#561686" stop-opacity="0" />
            </linearGradient>
            <linearGradient
              id="paint1_linear_30_192"
              x1="23.9104"
              y1="24.0335"
              x2="23.9104"
              y2="-12.5858"
              gradientUnits="userSpaceOnUse"
            >
              <stop stop-color="#D1A9EF" />
              <stop offset="1" stop-color="#FEFDFF" stop-opacity="0.8" />
            </linearGradient>
            <linearGradient
              id="paint2_linear_30_192"
              x1="24"
              y1="22"
              x2="24"
              y2="14"
              gradientUnits="userSpaceOnUse"
            >
              <stop stop-color="#561686" />
              <stop offset="1" stop-color="#341B46" />
            </linearGradient>
            <linearGradient
              id="paint3_linear_30_192"
              x1="24"
              y1="13"
              x2="24"
              y2="9"
              gradientUnits="userSpaceOnUse"
            >
              <stop stop-color="#561686" />
              <stop offset="1" stop-color="#371B4A" />
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
