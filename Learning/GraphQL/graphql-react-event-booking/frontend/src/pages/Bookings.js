import React, { useContext, useEffect, useState } from 'react'

import { useLazyQuery, useMutation, gql } from '@apollo/client';
import { AuthContext } from '../context/auth-context';

import './Bookings.css';
import { Spinner } from '../components/Spinner/Spinner';
import { BookingList } from '../components/Bookings/BookingsList/BookingList';
import { BookingsChart } from '../components/Bookings/BookingsChart/BookingsChart';
import { BookingsControls } from '../components/Bookings/BookingsControls/BookingsControls';

const GET_BOOKINGS = gql`
  query GetBookings {
    bookings {
      _id,
      event {
        _id,
        title,
        date,
        price
      },
      createdAt,
      updatedAt
    }
  }
`;

const BOOK_EVENT = gql`
  mutation BookEvent($eventId: ID!) {
    bookEvent(eventId: $eventId) {
      _id,
      event,
      user,
      createdAt,
      updatedAt
    }
  }
`;

const CANCEL_BOOKING = gql`
  mutation CancelBooking($bookingId: ID!) {
    cancelBooking(bookingId: $bookingId) {
      _id,
    }
  }
`;

export const BookingsPage = () => {

  const authContext = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [bookings, setBookings] = useState([]);
  const [outputType, setOutputType] = useState('chart');

  const [getBookings] = useLazyQuery(GET_BOOKINGS, {
    context: {
      headers: {
        "Authorization": `Bearer ${authContext.token}`
      }
    },
    // This fucks with the cache!!
    // You need it for some reason right now!!
    fetchPolicy: 'network-only'
  });

  const [cancelBooking] = useMutation(CANCEL_BOOKING, {
    context: {
      headers: {
        "Authorization": `Bearer ${authContext.token}`
      }
    }
  });

  const fetchBookings = async () => {
    setIsLoading(true);
    try {
      const {
        data: {
          bookings: fetchedBookings
        }
      } = await getBookings();

      console.log(fetchedBookings);
      setBookings(fetchedBookings);


      setIsLoading(false);

    } catch (err) {
      setIsLoading(false);
      console.log('fetchBookings error: ', err);
    }
  }

  const onDeleteBookingHandler = async (bookingId) => {

    try {
      const {
        data: {
          cancelBooking: canceledBooking
        }
      } = await cancelBooking({
        variables: {
          bookingId: bookingId
        }
      });

      console.log(canceledBooking);

      setBookings((prevBookings) => {
        return prevBookings.filter((booking) => {
          return booking._id !== canceledBooking._id;
        });
      })

    } catch (err) {
      console.log("error when canceling booking: ", err);
    }
  }

  useEffect(() => {
    fetchBookings();
  }, []);

  let content = <Spinner />
  if (!isLoading) {
    content = (
      <>
        <BookingsControls
          changeBookingType={(type) => {
            setOutputType(type)
          }}
          activeOutputType={outputType}
        />
        <div>
          {outputType === 'list' ? (
            <BookingList
              bookings={bookings}
              onDeleteBooking={onDeleteBookingHandler}
            />

          ) : (
            <BookingsChart
              bookings={bookings}
            />
          )}
        </div>
      </>
    );
  }

  return (
    <>
      {content}
    </>
  )
}
