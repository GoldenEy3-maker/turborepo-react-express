import type { FC } from "react"
import Skeleton from "react-loading-skeleton"
import "react-loading-skeleton/dist/skeleton.css"
import styles from "./styles.module.scss"

const LoadingSkeleton: FC = () => {
  return (
    <div className={styles.loadingSkeletonContainer}>
      <div className={styles.loadingSkeletonHeader}>
        <Skeleton width="20em" />
        <div className={styles.loadingSkeletonExtraInfo}>
          <Skeleton width="8em" />
          <Skeleton width="2em" height="2em" circle />
        </div>
      </div>
      <Skeleton count={5} />
      <Skeleton count={5} />
      <Skeleton
        count={3}
        width="10em"
        containerClassName={styles.loadingSkeletonFooter}
      />
    </div>
  )
}

export default LoadingSkeleton
