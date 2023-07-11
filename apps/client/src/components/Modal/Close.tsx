import type { FC } from "react"
import Button from "../Button"

type CloseProps = {
  handler: () => void
}

export const Close: FC<CloseProps> = ({ handler }) => {
  return (
    <Button isIcon onClick={handler}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="24"
        viewBox="0 -960 960 960"
        width="24"
      >
        <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
      </svg>
    </Button>
  )
}
