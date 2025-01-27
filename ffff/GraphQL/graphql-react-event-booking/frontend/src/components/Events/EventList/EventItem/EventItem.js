import React, { useContext } from 'react';

import { AuthContext } from '../../../../context/auth-context';

import './EventItem.css';

export const EventItem = ({ event, onDetail }) => {

  const authContect = useContext(AuthContext);

  return (
    <li
      className='event_item'
    >
      <div>
        <h1>{event.title}</h1>
        <h2>${event.price} - {new Date(event.date).toLocaleDateString('de-DE')}</h2>
      </div>
      <div>
        {authContect.userId == event.creator._id ? (
          <p>You're the owner of this event</p>
        ) : (
          <button className='btn' onClick={() => onDetail(event._id)}>View Details</button>
        )}
      </div>
    </li>
  )
}
