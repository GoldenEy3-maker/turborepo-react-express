import { cls } from "@/utils/helpers"
import styles from "./stats.module.scss"

const Stats = () => {
  return (
    <ul className={styles.list}>
      <li className={styles.item}>
        <header className={styles.itemHeader}>
          <p className={styles.itemTitle}>Available to witdraw</p>
          <div className={cls([styles.itemProgress])}>
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="20"
                viewBox="0 -960 960 960"
                width="20"
              >
                <path d="M480-240 240-480l56-56 144 144v-368h80v368l144-144 56 56-240 240Z" />
              </svg>
            </span>
            <p> 10.0%</p>
          </div>
        </header>
        <h3 className={styles.itemValue}>$1,567.99</h3>
        <p className={styles.itemExtra}>Wed, Jul 20</p>
      </li>
      <li className={styles.item}>
        <header className={styles.itemHeader}>
          <p className={styles.itemTitle}>Today Revenue</p>
          <div className={cls([styles.itemProgress, styles._danger])}>
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="20"
                viewBox="0 -960 960 960"
                width="20"
              >
                <path d="M480-240 240-480l56-56 144 144v-368h80v368l144-144 56 56-240 240Z" />
              </svg>
            </span>
            <p>3.0%</p>
          </div>
        </header>
        <h3 className={styles.itemValue}>$2,868.99</h3>
        <p className={styles.itemExtra}>143 Orders</p>
      </li>
      <li className={styles.item}>
        <header className={styles.itemHeader}>
          <p className={styles.itemTitle}>Today Sessions</p>
          <div className={cls([styles.itemProgress])}>
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="20"
                viewBox="0 -960 960 960"
                width="20"
              >
                <path d="M480-240 240-480l56-56 144 144v-368h80v368l144-144 56 56-240 240Z" />
              </svg>
            </span>
            <p>3.2%</p>
          </div>
        </header>
        <h3 className={styles.itemValue}>156k</h3>
        <p className={styles.itemExtra}>32k Visitors</p>
      </li>
      <li className={styles.item}>
        <header className={styles.itemHeader}>
          <p className={styles.itemTitle}>Subscribers</p>
          <div className={cls([styles.itemProgress])}>
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="20"
                viewBox="0 -960 960 960"
                width="20"
              >
                <path d="M480-240 240-480l56-56 144 144v-368h80v368l144-144 56 56-240 240Z" />
              </svg>
            </span>
            <p>8.3%</p>
          </div>
        </header>
        <h3 className={styles.itemValue}>3,422</h3>
        <p className={styles.itemExtra}>$34.28 Average Order</p>
      </li>
    </ul>
  )
}

export default Stats
