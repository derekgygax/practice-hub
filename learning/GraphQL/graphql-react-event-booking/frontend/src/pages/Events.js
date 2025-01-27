import React, { useState, useRef, useContext, useEffect } from 'react'

import { Modal } from '../components/Modal/Modal';

import { useLazyQuery, useMutation, gql } from '@apollo/client';

import { Backdrop } from '../components/Backdrop/Backdrop';

import { AuthContext } from '../context/auth-context';

import './Events.css';
import { EventItem } from '../components/Events/EventList/EventItem/EventItem';
import { EventList } from '../components/Events/EventList/EventList';
import { Spinner } from '../components/Spinner/Spinner';

// NOTE THE WAY YOU ARE DOING classNames is WRONG
// should use _ not -

const GET_EVENTS = gql`
  query GetEvents {
    events {
      _id,
      title,
      description,
      price,
      date,
      creator {
        _id,
        email
      }
    }
  }
`;

const CREATE_EVENT = gql`
  mutation CreateEvent($eventInput: EventInput!) {
    createEvent(eventInput: $eventInput) {
      _id,
      title,
      price,
      date,
      description
    }
  }
`;

const BOOK_EVENT = gql`
  mutation BookEvent($eventId: ID!) {
    bookEvent(eventId: $eventId) {
      _id,
      createdAt,
      updatedAt
    }
  }
`;

export const EventsPage = () => {

  const authContext = useContext(AuthContext);

  // You can use states for the inputs but Max wants to use References
  // So we are going to do that in this one
  const titleRef = useRef();
  const priceRef = useRef();
  const dateRef = useRef();
  const descriptionRef = useRef();

  const [getEvents] = useLazyQuery(GET_EVENTS, {
    // This fucks with the cache!!
    // You need it for some reason right now!!
    fetchPolicy: 'network-only'
  });

  // Can have all the loading and error things!!! 
  // const [createEvent, { loading: createEventLoading, error: createEventError, reset }] = useMutation(CREATE_EVENT, {
  const [createEvent] = useMutation(CREATE_EVENT, {
    context: {
      headers: {
        "Authorization": `Bearer ${authContext.token}`
      }
    }
  });

  const [bookEvent] = useMutation(BOOK_EVENT, {
    context: {
      headers: {
        "Authorization": `Bearer ${authContext.token}`
      }
    }
  });

  const [isCreating, setIsCreating] = useState(false);
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);


  const modalConfirmHandler = async () => {

    setIsCreating(false);
    const titleEl = titleRef.current.value;
    const priceEl = +priceRef.current.value;  // The + makes it a number!
    const dateEl = dateRef.current.value;
    const descriptionEl = descriptionRef.current.value;

    if (
      titleEl.trim() === 0 ||
      priceEl <= 0 ||
      dateEl.trim() === 0 ||
      descriptionEl.trim() === 0
    ) {
      return;
    }

    const event = {
      title: titleEl,
      price: priceEl,
      date: dateEl,
      description: descriptionEl
    };

    try {

      const {
        data: {
          createEvent: createdEvent
        }
      } = await createEvent({
        variables: {
          eventInput: {
            ...event
          }
        }
      });

      setEvents((prevEvents) => {
        return [
          ...prevEvents,
          {
            ...createdEvent,
            creator: {
              _id: authContext.userId,
            }
          }
        ];
      });
    } catch (err) {
      console.log("error: ", err);
    }
  }

  const fetchEvents = async (where) => {

    setIsLoading(true);

    try {
      const { data: { events: fetchedEvents } } = await getEvents();
      setEvents(fetchedEvents);

      setIsLoading(false);

    } catch (err) {
      setIsLoading(false);
      console.log("error: ", err);
    }


  }

  const showDetailHandler = (eventId) => {
    const selectedEvent = events.find(e => e._id === eventId);
    setSelectedEvent(selectedEvent);
  }

  const bookEventHandler = async () => {
    if (!authContext.token) {
      setSelectedEvent(null);
      return;
    }
    try {
      const {
        data: {
          bookEvent: bookedEvent
        }
      } = await bookEvent({
        variables: {
          eventId: selectedEvent._id
        }
      });

      console.log('bookedEvent: ', bookedEvent);

      setSelectedEvent(null);

    } catch (err) {
      console.log('booking event err', err);
    }
  }

  useEffect(() => {
    console.log('In the useEffect on Events');
    fetchEvents('in effect');
  }, []);

  return (
    <>
      {(isCreating || selectedEvent) && (
        <Backdrop />
      )}
      {isCreating && (
        <Modal
          title="Add Event"
          canCancel
          canConfirm
          onCancel={() => {
            setIsCreating(false);
          }}
          onConfirm={modalConfirmHandler}
          confirmText="Confirm"
        >
          <form>
            <div className='form-control'>
              <label htmlFor='title'>Title</label>
              <input ref={titleRef} type="text" id="title" />
            </div>
            <div className='form-control'>
              <label htmlFor='price'>Price</label>
              <input ref={priceRef} type="number" id="price" />
            </div>
            <div className='form-control'>
              <label htmlFor='date'>Date</label>
              <input ref={dateRef} type="datetime-local" id="date" />
            </div>
            <div className='form-control'>
              <label htmlFor='description'>Description</label>
              <textarea ref={descriptionRef} rows="4" id="description" />
            </div>
          </form>
        </Modal>
      )}
      {selectedEvent && (
        <Modal
          title={selectedEvent.title}
          canCancel
          canConfirm
          onCancel={() => {
            setIsCreating(false);
            setSelectedEvent(null);
          }}
          onConfirm={bookEventHandler}
          confirmText={authContext.token ? "Book Event" : "Confirm"}
        >
          <h1>{selectedEvent.title}</h1>
          <h2>
            ${selectedEvent.price} - {new Date(selectedEvent.date).toLocaleDateString('de-DE')}
          </h2>
          <p>{selectedEvent.description}</p>
        </Modal>
      )}
      {authContext.token && (
        <div className='events-control'>
          <p>Share your own events!</p>
          <button
            className='btn'
            onClick={() => {
              setIsCreating(true)
            }}
          >
            Create Event
          </button>
        </div>
      )}
      {isLoading ? (
        <Spinner />
      ) : (
        <EventList
          events={events}
          onViewDetail={showDetailHandler}
        />
      )}
    </>
  )
}
