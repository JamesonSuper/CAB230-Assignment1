import React from 'react';
import { Line } from 'react-chartjs-2';
import "../index.css"

export default function LineGraph(props) {
  // Line graph data
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
  // Line graph styling options
  const options = {
    indexAxis: 'x',
    layout: {
      padding: {
      }
    },
    elements: {
      line: {
        backgroundColor: 'rgba(210, 210, 210, 1)',
        borderColor: 'rgba(210, 210, 210, 1)',
        fill: true,
      },
      point: {
        pointBackgroundColor: 'rgba(210, 210, 210, 1)',
        pointRadius: 6,
      },
    },
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: 'rgba(210, 210, 210, 1)',
          display: true,
          boxWidth: 0,
          boxHeight: 0,
        }
      }
    },
    scales: {
      x: {
        ticks: {
          color: 'rgba(210, 210, 210, 1)'
        }
      },
      y: {
        ticks: {
          color: 'rgba(210, 210, 210, 1)'
        }
      }
    }
  };

  return (
    <div>
      <Line className="lineGraph" data={data} options={options} />
    </div >
  );
}