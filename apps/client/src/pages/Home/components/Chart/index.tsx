import CustomChart from "@/components/Chart"
import { getDaysInCurrentMonth, getRandomNumber } from "@/utils/helpers"
import styles from "@/pages/Home/home.module.scss"
import * as Section from "@/components/Section"
import * as Select from "@/components/Select"
import { useState } from "react"
import type { ValueOf } from "utils/types"

const TypeSelectValues = {
  Orders: "Заказов",
  Views: "Просмотров",
  Activity: "Активности"
} as const

type TypeSelectValues = ValueOf<typeof TypeSelectValues>

const SortSelectValues = {
  Month: "Месяц",
  Year: "Год"
} as const

type SortSelectValues = ValueOf<typeof SortSelectValues>

const Chart = () => {
  const [typeSelectState, setTypeSelectState] = useState<TypeSelectValues>("Заказов")
  const [sortSelectState, setSortSelectState] = useState<SortSelectValues>("Месяц")

  return (
    <Section.Root className={styles.chart}>
      <Section.Header>
        <Section.Title>
          <span>Аналитика</span>
          <Select.Root>
            <Select.Trigger value={typeSelectState} />
            <Select.Options values={Object.values(TypeSelectValues)}
              handler={(value) => setTypeSelectState(value as TypeSelectValues)} />
          </Select.Root>
        </Section.Title>
        <Select.Root>
          <Select.Trigger value={sortSelectState} />
          <Select.Options values={Object.values(SortSelectValues)}
            handler={(value) => setSortSelectState(value as SortSelectValues)} />
        </Select.Root>
      </Section.Header>
      <Section.Content>
        <CustomChart
          key={crypto.randomUUID()}
          type="line"
          data={{
            labels: getDaysInCurrentMonth(),
            datasets: [
              {
                fill: true,
                label: "Продажи",
                data: getDaysInCurrentMonth().map(() =>
                  getRandomNumber(50000, 100000)
                ),
                borderColor: "hsl(274, 69%, 80%)"
              }
            ]
          }}
          gradiant={{
            top: {
              offset: 0.6,
              color: "hsla(274, 69%, 80%, .2)"
            },
            bottom: {
              offset: 1,
              color: "hsl(0, 0%, 100%, 0)"
            }
          }}
          width={1000}
          height={300}
          options={{
            onHover(event, elements, chart) {
              const colors = []

              if (elements[0]) {
                const datapoint = elements[0].index

                for (const label of chart.data.labels!) {
                  if (datapoint + 1 === label) {
                    colors.push("hsl(274, 69%, 80%)")
                  } else {
                    colors.push("hsla(0, 0%, 40%)")
                  }
                }

                chart.config.options!.scales!.x!.ticks!.color = colors

                chart.update()

              }
            },
            elements: {
              point: {
                radius: 0,
                pointStyle: "circle",
                hoverBorderColor: "hsl(274, 69%, 80%)",
                hoverBorderWidth: 3,
                hoverBackgroundColor: "#fff",
                hoverRadius: 8
              },
              line: {
                tension: 0.4
              }
            },
            interaction: {
              intersect: false
            }
          }}
        />
      </Section.Content>
    </Section.Root>

  )
}

export default Chart
