import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import MyCryptoChart from "./dashboard-components/mycp"
const ApexChart = () => {
  const [chartData] = useState({
    series: [
      {
        name: 'Income',
        data: [8000, 6000, 5500, 7000, 6500, 7500, 7000, 8000, 10000, 9000, 17000, 9500, 9000, 10000, 9500, 10500, 10000, 11000],
      },
      {
        name: 'Expenses',
        data: [4000, 5000, 4500, 6000, 17000, 6500, 6000, 7000, 6500, 7500, 7000, 8000, 7500, 8500, 8000, 9000, 8500, 9500],
      },
    ],
    options: {
      chart: {
        height: 350,
        type: 'line',
      },
      forecastDataPoints: {
        count: 7,
      },
      stroke: {
        width: 5,
        curve: 'smooth',
      },
      xaxis: {
        type: 'datetime',
        categories: [
          '1/11/2000', '2/11/2000', '3/11/2000', '4/11/2000', '5/11/2000', '6/11/2000', '7/11/2000', '8/11/2000', '9/11/2000',
          '10/11/2000', '11/11/2000', '12/11/2000', '1/11/2001', '2/11/2001', '3/11/2001', '4/11/2001', '5/11/2001', '6/11/2001'
        ],
        tickAmount: 10,
        labels: {
          formatter: function (value, timestamp, opts) {
            return opts.dateFormatter(new Date(timestamp), 'dd MMM');
          },
        },
      },
      title: {
        text: 'Income and Expenses',
        align: 'left',
        style: {
          fontSize: '16px',
          color: '#666',
        },
      },
      fill: {
        type: 'gradient',
        gradient: {
          shade: 'dark',
          gradientToColors: ['#FDD835'],
          shadeIntensity: 1,
          type: 'horizontal',
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 100, 100, 100],
        },
      },
    },
  });

  return (
    <div className='card' style={{padding: '20px', height: '400px', overflow: 'hidden'}}>
        {/* <ReactApexChart options={chartData.options} series={chartData.series} type="line" height={350} /> */}
        <MyCryptoChart />
    </div>
  );
};

export default ApexChart;
