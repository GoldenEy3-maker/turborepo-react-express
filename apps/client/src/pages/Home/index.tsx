import * as Section from "@/components/Section"
import { type FC } from "react"
import Chart from "./components/Chart"
import Stats from "./components/Stats"
import styles from "./home.module.scss"
import TopPerformers from "@/pages/Home/components/TopPerformers"
import Link from "@/components/Link"

const HomePage: FC = () => {
  return (
    <main className={styles.home}>
      <Section.Root>
        <Section.Content>
          <Stats />
        </Section.Content>
      </Section.Root>
      <Section.Group>
        <Section.Root className={styles.chart}>
          <Section.Header>
            <Section.Title>Статистика продаж</Section.Title>
          </Section.Header>
          <Section.Content>
            <Chart />
          </Section.Content>
        </Section.Root>
        <Section.Root>
          <Section.Header>
            <Section.Title>Способ заказа</Section.Title>
          </Section.Header>
        </Section.Root>
      </Section.Group>
      <Section.Group>
        <Section.Root>
          <Section.Header>
            <Section.Title>Топ исполнители месяца</Section.Title>
            <Link to='#'>Посмотреть все</Link>
          </Section.Header>
          <Section.Content>
            <TopPerformers />
          </Section.Content>
        </Section.Root>
        <Section.Root>
          <Section.Header>
            <Section.Title>Рейтинг позиций</Section.Title>
          </Section.Header>
        </Section.Root>
      </Section.Group>
    </main>
  )
}

export default HomePage
