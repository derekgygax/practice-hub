import React from 'react'
import { EventItem } from './EventItem/EventItem';

import './EventList.css';

export const EventList = ({ events, onViewDetail }) => {
  return (
    <ul className='event_list'>
      {events.map((event) => {
        return (
          <EventItem
            key={`event_list_item_${event._id}`}
            event={event}
            onDetail={(eventId) => onViewDetail(eventId)}
          />
        )
      })}
    </ul>
  )
}
