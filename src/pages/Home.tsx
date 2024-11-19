import React from 'react';
import LineChart from '../components/LineChart';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  const chartData = {
    labels: ['October', 'November', 'December', 'January'],
    datasets: [
      {
        label: 'ចំណូល',
        data: [250, 3000, 7000, 10000],
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
        fill: true, // Ensure fill is enabled
        borderWidth: 2,
      },
      {
        label: 'ចំណាយ',
        data: [50, 100, 200, 400],
        borderColor: 'rgb(255, 165, 0)',
        backgroundColor: 'rgba(255, 165, 0, 0.5)',
        fill: true, // Ensure fill is enabled
        borderWidth: 2,
      },
    ],
    title: 'ចំណូល និង ចំណាយ',
  };

  return (
    <div className="bg-white">
      <div>
        <LineChart
          labels={chartData.labels}
          datasets={chartData.datasets}
          title={chartData.title}
        />
      </div>

      <div className="text-black mt-5">
        <p className="tracking-wide text-lg"> - ចំណូល: 1000$</p>
        <p className="tracking-wide mb-3 text-lg"> - ចំណាយ: 1000$</p>
        <table className="w-full border">
          <tr>
            <td className="border border-gray-400 p-2">កម្មករ</td>
            <td className="border border-gray-400 text-center">100$</td>
          </tr>
          <tr>
            <td className="border border-gray-400 p-2">ប្រេង សាំង</td>
            <td className="border border-gray-400 text-center">100$</td>
          </tr>
          <tr>
            <td className="border border-gray-400 p-2">ថ្នាំ</td>
            <td className="border border-gray-400 text-center">100$</td>
          </tr>
          <tr>
            <td className="border border-gray-400 p-2">ជី</td>
            <td className="border border-gray-400 text-center">100$</td>
          </tr>
        </table>
        <div className='mt-5 grid grid-cols-3 gap-3'>
          <Link to='/selling' className='text-center bg-blue-600 rounded py-8 text-white text-xl font-[500]'>
            Selling
          </Link>
          <Link to='/staff' className='text-center bg-orange-600 rounded py-8 text-white text-xl font-[500]'>
            Calculation
          </Link>
          <Link to='/report' className='text-center bg-yellow-400 rounded py-8 text-black border border-yellow-500 text-xl font-[500]'>
            Report
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;