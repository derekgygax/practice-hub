
import { Event } from "../../models/event.js";
import { User } from "../../models/user.js";
import { dateToSting } from '../../helpers/date.js';

import DataLoader from "dataloader";


// I think the booking type is changing!! 
// 	WHICH IS NUTS!!!
// Ya, it didn't work again ... what the fuck is going on ... this is a real problem that if you didn't fix would serious fuck things up

// I have no idea how it happens but the k;k one keeps coming back somehow and others dissapear. Figure it out later, but if its a data thing you have a super super problem!!

// But this is just showing you how to do things, this isn't real, remember that too. And just cause this messes up doesn't mean you will mess up all the time!!!

// Max said something like this is happening!!! AAAHHH damn, lets see what he says

// going through it quick, think of it tomorrow. but follow him today

// It has to do with mongodb and the dataloader, mongodb needs to return things in the order in which things are sent in for dataloader to work correctly. See the ordering in merge.js events()

// The LOADER is very important because then not making all the requests
// and instead just does one with everything
// IMPORTANT TO UNDERSTAND THIS SOMETIME!!!
// Batching mechanism
// Implementing DataLoader so that you don't go in the DB too many times!!
const eventLoader = new DataLoader((eventIds) => {
  return events(eventIds);
});

const userLoader = new DataLoader((userIds) => {
  return User.find({ _id: { $in: userIds } });
});

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

// THERE IS AN ERROR IN THIS CODE!!
// COPIED AND FIXED!!
// Causes the wrong events to be booked!!!
// has to do with dataloader and the order in which ids are added and stuff
// const events = async (eventIds) => {
//   try {
//     // this has special syntax for monogdb!
//     const events = await Event.find({ _id: { $in: eventIds } });

//     return events.map((event) => {
//       return transformEvent(event);
//     })
//   } catch (err) {
//     throw err;
//   }
// }
// FIXED!!
// Has to do with dataloader and the order of eventIds
// mongodb can return the eventids in any order it wants
// and we need the eventids after mongodb has run to match
// the order of the eventIds passed in!!
const events = async (eventIds) => {
  try {
    // this has special syntax for monogdb!
    const events = await Event.find({ _id: { $in: eventIds } });
    // ensure the order of events returned from mongodb matches
    // the order of the eventIds passed in
    // I don't understand the sort. figure it out!!
    // This makes sure the sort of the events always matches the order of the eventIds
    events.sort((a, b) => {
      return (
        eventIds.indexOf(a._id.toString()) - eventIds.indexOf(b._id.toString())
      );
    });
    console.log(events, eventIds);
    return events.map((event) => {
      return transformEvent(event);
    })

  } catch (err) {
    throw err;
  }
}

// get a single event
const singleEvent = async (eventId) => {
  try {
    // id needs to be a string to do eventLoader correctly
    // id can be an object which causes issues. no two objects are the same even if have same content
    const event = await eventLoader.load(eventId.toString());
    return event;
  } catch (err) {
    throw err;
  }
}

const user = async (userId) => {

  try {
    // id needs to be a string to do userLoader correctly
    // id can be an object which causes issues. no two objects are the same even if have same content
    const user = await userLoader.load(userId.toString());
    return {
      ...user._doc,
      createdEvents: () => eventLoader.loadMany(user._doc.createdEvents)
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

