import CustomChart from "@/components/Chart"
import { getDaysInCurrentMonth, getRandomNumber } from "@/utils/helpers"

const Chart = () => {
  return (
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
  )
}

export default Chart
