import type { DetailedHTMLProps, FC, HTMLAttributes } from "react"
import styles from "./activitySpan.module.scss"
import { cls } from "@/utils/helpers.ts"

type ActivitySpanProps = {
  value: number
} & DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>

const ActivitySpan: FC<ActivitySpanProps> = ({ value, className }) => {
  return (
    <span className={cls([className, styles.activitySpan], {
      [styles._danger]: value >= 0 && value <= 20,
      [styles._warning]: value > 20 && value < 70,
      [styles._success]: value >= 70
    })}>{value}%</span>
  )
}
export default ActivitySpan
