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
        }
      ]
  };
  const options = {
    indexAxis: 'y',
    layout: {
      padding: {
        top: 5,
        left: 15,
        right: 15,
        bottom: 15
      }
    },
    elements: {
      bar: {
        borderWidth: 2,
        backgroundColor: 'rgba(220, 220, 220, 1)',
        borderColor: 'rgba(0, 0, 0, 1)',
        borderRadius: 200,
      },
    },
    plugins: {
      legend: {
        position: 'right',
        labels: {
          color: 'rgba(220, 220, 220, 1)',
          display: true,
          boxWidth: 0,
          boxHeight: 0,
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