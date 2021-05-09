import React from 'react';
import { Bar } from 'react-chartjs-2';
import "../index.css"

export default function HorizontalBar(props) {
  const data = {
    labels: props.countries,
    datasets:
      [
        {
          label: props.label,
          data: props.metricData,
          color: 'rgba(0, 0, 0, 1)',
          backgroundColor: 'rgba(45,52,54, 1)',
          borderColor: 'rgba(28,28,28, 1)',
          borderWidth: 2,
        }
      ]
  };
  const options = {
    indexAxis: 'y',
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
          fontColor: '#f00',
        }
      }
    }
  };

  return (
    <div>
      <Bar className="barGraph" data={data} options={options} />
    </div >
  );
}