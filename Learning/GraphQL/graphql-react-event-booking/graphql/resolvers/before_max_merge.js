
import { Event } from "../../models/event.js";
import { User } from "../../models/user.js";
import { dateToSting } from '../../helpers/date.js';

// Having the two below functions lets you drill deep down
// in the relation between the events and the user when querying
// graphQL for the data. Not infinite loop because it only works as requested
// For instance in graphiql doing this
// query {
//   events {
//     title
// 		description
//     creator {
//       _id
//       email,
//       createdEvents {
//         title
//         description
//         creator {
//           email
//         }
//       }
//     }
//   }
// }
const events = async (eventIds) => {
  try {
    // this has special syntax for monogdb!
    const events = await Event.find({ _id: { $in: eventIds } });
    return events.map((event) => {
      return transformEvent(event);
    });
  } catch (err) {
    throw err;
  }
}

// get a single event
const singleEvent = async (eventId) => {
  try {
    const event = await Event.findById(eventId);
    return {
      ...event._doc,
      creator: () => user(event.creator)
    }
  } catch (err) {
    throw err;
  }
}

const user = async (userId) => {
  try {
    const user = await User.findById(userId);
    return {
      ...user._doc,
      createdEvents: () => events(user._doc.createdEvents)
    }
  } catch (err) {
    throw err;
  }
}

export const transformEvent = (event) => {
  return {
    ...event._doc,
    date: dateToSting(event._doc.date),
    // Maybe you used to need below but now it works on its own
    // the native id turns into a string for us that it didn't used to do
    // _id: event._doc._id.toString()
    // Max does it like this but I don't think we need the this crap so no bind
    // creator: user.bind(this, event._doc.creator)
    creator: () => user(event._doc.creator),
  }
}

export const transformBooking = (booking) => {
  return {
    ...booking._doc,
    user: () => user(booking._doc.user),
    event: () => singleEvent(booking._doc.event),
    createdAt: dateToSting(booking._doc.createdAt),
    updatedAt: dateToSting(booking._doc.updatedAt)
  }
}

