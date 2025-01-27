import React from 'react'

import { Bar } from 'react-chartjs';

import './BookingsChart.css';

const BOOKINGS_BUCKETS = {
  'cheap': {
    min: 0,
    max: 100
  },
  'normal': {
    min: 100,
    max: 200
  },
  'expensive': {
    min: 200,
    max: 1000000
  }
};

export const BookingsChart = ({ bookings }) => {

  const chartData = {
    labels: [],
    datasets: []
  };
  let values = [];
  // loop through object
  for (const bucket in BOOKINGS_BUCKETS) {
    const filteredBookingsCount = bookings.reduce((prev, current) => {
      if (current.event.price >= BOOKINGS_BUCKETS[bucket].min
        && current.event.price < BOOKINGS_BUCKETS[bucket].max) {
        return prev + 1;
      } else {
        return prev;
      }

    }, 0);
    values.push(filteredBookingsCount);
    chartData.labels.push(bucket);
    chartData.datasets.push({
      fillColor: 'rgba(220,220,220,0.5)',
      strokeColor: 'rgba(220,220,220,0.8)',
      highlightFill: 'rgba(220,220,220,0.75)',
      highlightStroke: 'rgba(220,220,220,1)',
      data: values
    })
    // TODO I am a little confused why you need this
    // It has something to do with how the below copy
    // works I am sure
    values = [...values];
    values[values.length - 1] = 0;
  }

  return (
    <div className='bookings-chart-wrapper'>
      <Bar
        data={chartData}
      />
    </div>
  )
}
