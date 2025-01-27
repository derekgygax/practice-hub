import React from 'react'
import { BookingItem } from './BookingItem/BookingItem';

import './BookingList.css';

export const BookingList = ({ bookings, onDeleteBooking }) => {
  return (
    <ul className='bookings_list'>
      {bookings.map((booking) => {
        return (
          <BookingItem
            key={booking._id}
            booking={booking}
            onDelete={(bookingId) => {
              onDeleteBooking(bookingId);
            }}
          />
        );
      })}
    </ul>
  )
}
