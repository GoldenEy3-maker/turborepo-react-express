import ProgressBar from "./ProgressBar"
import styles from "./stats.module.scss"

const Stats = () => {
  return (
    <div>
      <ul className={styles.list}>
        <li className={styles.item}>
          <div className={styles.info}>
            <h4 className={styles.title}>Всего заказов</h4>
            <p>Количество всех заказов</p>
            <span>25</span>
          </div>
          <div className={styles.progress}>
            <ProgressBar value={100} />
          </div>
        </li>
        <li className={styles.item}>
          <div className={styles.info}>
            <h4 className={styles.title}>Выполненные</h4>
            <p>Количество выполненных заказов</p>
            <span>21</span>
          </div>
          <div className={styles.progress}>
            <ProgressBar value={84} isSuccess />
          </div>
        </li>
        <li className={styles.item}>
          <div className={styles.info}>
            <h4 className={styles.title}>Отмененные</h4>
            <p>Количество отменненых заказов</p>
            <span>1</span>
          </div>
          <div className={styles.progress}>
            <ProgressBar value={1} isDanger />
          </div>
        </li>
      </ul>
    </div>
  )
}

export default Stats
