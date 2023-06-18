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
            borderColor: "hsl(274, 69%, 70%)",
          },
        ],
      }}
      gradiant={{
        top: {
          offset: 0.6,
          color: "hsla(274, 69%, 70%, .2)",
        },
        bottom: {
          offset: 1,
          color: "hsl(0, 0%, 100%, 0)",
        },
      }}
      width={1000}
      height={300}
      options={{
        interaction: {
          intersect: false,
        },
      }}
    />
  )
}

export default Chart
