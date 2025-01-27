
import { Booking } from '../../models/booking.js';
import { Event } from '../../models/event.js';
import { transformBooking, transformEvent } from './merge.js';

export const bookingsResolvers = {
  bookings: async (args, req) => {
    // NEED AUTHENTICATION
    // outside try catch because you don't want to catch!!
    if (!req.isAuth) {
      throw new Error("Unautheticated");
    }

    try {
      // This is a filtering that mongodb can do with specifiying the user
      // and then the userId from the token and request
      // only fetch the bookings for the specific user
      const bookings = await Booking.find({ user: req.userId });
      return bookings.map((booking) => {
        return transformBooking(booking);
      })
    } catch (err) {
      throw err;
    }
  },
  bookEvent: async (args, req) => {
    // NEED AUTHENTICATION
    // outside try catch because you don't want to catch!!
    if (!req.isAuth) {
      throw new Error("Unautheticated");
    }

    try {
      const fetchedEvent = await Event.findOne({ _id: args.eventId })
      const booking = new Booking({
        user: req.userId,
        event: fetchedEvent
      });
      const result = await booking.save();
      return transformBooking(result);
    } catch (err) {
      throw err;
    }
  },
  cancelBooking: async (args, req) => {
    // NEED AUTHENTICATION
    // outside try catch because you don't want to catch!!
    if (!req.isAuth) {
      throw new Error("Unautheticated");
    }

    try {
      const booking = await Booking.findById(args.bookingId).populate('event');
      const event = transformEvent(booking.event);
      await Booking.deleteOne({ _id: args.bookingId });
      return booking;
    } catch (err) {
      throw err;
    }
  }
}