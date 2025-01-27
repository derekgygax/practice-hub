import React from 'react'

import './BookingsControls.css';

export const BookingsControls = ({
  changeBookingType,
  activeOutputType
}) => {
  return (
    <div className='bookings-control'>
      <button
        className={activeOutputType === 'list' ? 'active' : ''}
        onClick={() => changeBookingType('list')}
      >
        List
      </button>
      <button
        className={activeOutputType === 'chart' ? 'active' : ''}
        onClick={() => changeBookingType('chart')}
      >
        Chart
      </button>
    </div>
  )
}
