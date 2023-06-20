import * as Section from "@/components/Section"
import { type FC } from "react"
import Chart from "./components/Chart"
import Stats from "./components/Stats"
import styles from "./home.module.scss"
import TopPerformers from "@/pages/Home/components/TopPerformers"
import TopEmployers from "@/pages/Home/components/TopEmployers"
import PopularTopics from "@/pages/Home/components/PopularTopics"

const HomePage: FC = () => {
  return (
    <main className={styles.home}>
      <Stats />
      <Section.Group>
        <Chart />
        <PopularTopics />
      </Section.Group>
      <Section.Group>
        <TopPerformers />
        <TopEmployers />
      </Section.Group>
    </main>
  )
}

export default HomePage
