import React, { useEffect } from 'react';
import { Bar } from 'react-chartjs-2';

export default function HorizontalBar(props) {
  //  console.log(props.rowData[0].country);
  //   for( let i = 0; i < props.columns.length; i++ ) {
  //     console.log(props.columns[i].field);
  //     for( let j = 0; j < props.rowData.length; j++ ){
  //       console.log(props.rowData[j].score);
  //     }
  // }
  console.log(props.columns[1].headerName);
  const data = {
    labels: [
      'Score',
      'Economy',
      'Family',
      'Health',
      'Freedom',
      'Generosity',
      'Trust'],
    datasets: [
      {
        label: [
          'Score',
          'Economy',
          'Family',
          'Health',
          'Freedom',
          'Generosity',
          'Trust'
        ],
        data: [1, 1, 1, 1, 1, 1, 1],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',

        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    indexAxis: 'y',
    // Elements options apply to all of the options unless overridden in a dataset
    // In this case, we are setting the border of each horizontal bar to be 2px wide
    elements: {
      bar: {
        borderWidth: 2,
      },
    },
    responsive: true,
    plugins: {
      legend: {
        position: 'right',
      },
    },
  };

  return (
    <div className='header'>
      <h1 className='title'>Horizontal Bar Chart</h1>
      <Bar data={data} options={options} />
    </div>
  );
}