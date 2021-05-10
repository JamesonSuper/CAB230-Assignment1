import React from 'react';
import { Line } from 'react-chartjs-2';
import "../index.css"

export default function LineGraph(props) {
  const data = {
    labels: props.years,
    datasets:
      [
        {
          label: props.label,
          data: props.metricData,
          color: 'rgba(0, 0, 0, 1)',
          backgroundColor: 'rgba(80,80,80, 1)',
          borderColor: 'rgba(28,28,28, 1)',
          borderWidth: 2,
        }
      ]
  };
  const options = {
    indexAxis: 'x',
    layout: {
      padding: 10
    },
    elements: {
      bar: {
        borderWidth: 2,
      },
    },
    plugins: {
      legend: {
        position: 'right',
        labels: {
          fontColor: '#f60',
        }
      },
      title: {
        display: true,
        text: props.label,
      }
    }
  };

  return (
    <div>
      <Line className="lineGraph" data={data} options={options} />
    </div >
  );
}