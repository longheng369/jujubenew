import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface LineChartProps {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    borderColor: string;
    backgroundColor: string; // Fill color
    fill?: boolean;
  }[];
  title: string;
}

const LineChart: React.FC<LineChartProps> = ({ labels, datasets, title }) => {
  const chartData = {
    labels: labels,
    datasets: datasets.map((dataset) => ({
      ...dataset,
      fill: true, // Force fill
      tension: 0.1, // Optional: Smooth curves
    })),
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: title,
        font: {
          size: 18,
        },
      },
      tooltip: {
        mode: 'index' as const,
        intersect: false,
      },
    },
    scales: {
      x: {
        beginAtZero: true,
      },
      y: {
        beginAtZero: true,
      },
    },
    // maintainAspectRatio: false, // Allows flexible height adjustment
  };

  return <Line data={chartData} options={chartOptions} />;
};

export default LineChart;
