import { useEffect, useRef } from 'react'
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions
} from 'chart.js'
import { Doughnut } from 'react-chartjs-2'

ChartJS.register(ArcElement, Tooltip, Legend)

interface PortfolioChartProps {
  data: Array<{
    name: string
    symbol: string
    value: number
    color: string
  }>
}

export const PortfolioChart = ({ data }: PortfolioChartProps) => {
  if (data.length === 0) {
    return (
      <div className="bg-white overflow-hidden shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
            Portfolio Distribution
          </h3>
          <div className="text-center text-gray-500">
            <p>No data available</p>
          </div>
        </div>
      </div>
    )
  }

  const chartData: ChartData<'doughnut'> = {
    labels: data.map(item => item.symbol),
    datasets: [
      {
        data: data.map(item => item.value),
        backgroundColor: data.map(item => item.color),
        borderColor: data.map(item => item.color),
        borderWidth: 1,
        hoverOffset: 4
      }
    ]
  }

  const options: ChartOptions<'doughnut'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          padding: 20,
          usePointStyle: true,
          pointStyle: 'circle'
        }
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            const value = context.parsed
            const total = data.reduce((sum, item) => sum + item.value, 0)
            const percentage = ((value / total) * 100).toFixed(1)
            return `${context.label}: $${value.toFixed(2)} (${percentage}%)`
          }
        }
      }
    }
  }

  return (
    <div className="bg-white overflow-hidden shadow rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
          Portfolio Distribution
        </h3>
        <div className="h-64">
          <Doughnut data={chartData} options={options} />
        </div>
        
        <div className="mt-6 space-y-2">
          {data.map((item, index) => {
            const total = data.reduce((sum, asset) => sum + asset.value, 0)
            const percentage = ((item.value / total) * 100).toFixed(1)
            
            return (
              <div key={index} className="flex items-center justify-between text-sm">
                <div className="flex items-center">
                  <div 
                    className="w-3 h-3 rounded-full mr-2"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-gray-900">{item.name}</span>
                </div>
                <div className="text-right">
                  <span className="font-medium text-gray-900">
                    ${item.value.toFixed(2)}
                  </span>
                  <span className="text-gray-500 ml-2">
                    ({percentage}%)
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}