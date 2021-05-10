import React from 'react';
import { Bar } from 'react-chartjs-2';
import "../index.css"


export default function HorizontalBar(props) {
  // Bar graph data
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
  // Bar graph styling options
  const options = {
    indexAxis: 'y',
    layout: {
      padding: {
      }
    },
    elements: {
      bar: {
        borderWidth: 2,
        backgroundColor: 'rgba(45,52,54, 1)',
        borderColor: 'rgba(210, 210, 210, 1)',
      },
    },
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: 'rgba(230,230,230, 1)',
          display: true,
          boxWidth: 0,
          boxHeight: 0,
        }
      }
    },
    scales: {
      x: {
        ticks: {
          color: 'rgba(230,230,230, 1)'
        }
      },
      y: {
        ticks: {
          color: 'rgba(230,230,230, 1)'
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