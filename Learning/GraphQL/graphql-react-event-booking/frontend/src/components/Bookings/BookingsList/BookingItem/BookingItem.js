import React from 'react'

import './BookingItem.css';

export const BookingItem = ({ booking, onDelete }) => {
  return (
    <li className='bookings_item'>
      <div className='bookings_item-data'>
        {booking.event.title} - {' '}
        {new Date(booking.createdAt).toLocaleDateString('de-DE')}
      </div>
      <div className='booking_item-actions'>
        <button
          className='btn'
          onClick={() => {
            onDelete(booking._id)
          }}
        >Cancel</button>
      </div>
    </li>
  )
}
