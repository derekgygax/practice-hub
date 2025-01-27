
import { bookingsResolvers } from './booking.js';
import { usersResolvers } from './auth.js';
import { eventsResolvers } from './events.js';


// Make sure you have no naming classes
// between the different resolvers
// like in events, bookings, and
export const graphqlResolvers = {
  ...eventsResolvers,
  ...bookingsResolvers,
  ...usersResolvers
};