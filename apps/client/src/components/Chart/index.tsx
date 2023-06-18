import type { ChartArea, ChartData, ChartOptions, ChartType } from "chart.js"
import {
  CategoryScale,
  Chart as ChartJS,
  Filler,
  LineController,
  LineElement,
  LinearScale,
  PointElement,
  Tooltip,
} from "chart.js"
import { useState } from "react"
import { Chart } from "react-chartjs-2"

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineController,
  PointElement,
  LineElement,
  Tooltip,
  Filler
)

type CustomChartProps = {
  width?: number
  height?: number
  options?: ChartOptions
  data: ChartData
  type?: ChartType
  gradiant?: {
    top: {
      offset: number
      color: string
    }
    bottom: {
      offset: number
      color: string
    }
  }
}

const CustomChart = ({
  width,
  height,
  options,
  data,
  type = "line",
  gradiant,
}: CustomChartProps) => {
  const [chartData, setChartData] = useState<ChartData>({
    ...data,
  })

  const createGradient = (ctx: CanvasRenderingContext2D, area: ChartArea) => {
    const canvasGradiant = ctx.createLinearGradient(0, area.top, 0, area.bottom)

    if (gradiant) {
      canvasGradiant.addColorStop(gradiant.top.offset, gradiant.top.color)
      canvasGradiant.addColorStop(gradiant.bottom.offset, gradiant.bottom.color)
    }

    return canvasGradiant
  }

  return (
    <Chart
      type={type}
      ref={(node) => {
        if (node && gradiant) {
          setChartData((prev) => ({
            ...prev,
            datasets: prev.datasets.map((dataset) => ({
              ...dataset,
              backgroundColor: createGradient(node.ctx, node.chartArea),
            })),
          }))
        }
      }}
      options={{
        ...options,
        responsive: true,
        scales: {
          x: {
            border: {
              display: false,
            },
            grid: {
              display: false,
            },
          },
          y: {
            border: {
              display: false,
              dash: [4, 8],
            },
            grid: {
              color: "hsl(0, 0%, 20%)",
            },
          },
        },
      }}
      data={chartData}
      width={width}
      height={height}
    />
  )
}

export default CustomChart
