
import { Event } from "../../models/event.js";
import { User } from "../../models/user.js";
import { transformEvent } from "./merge.js";

export const eventsResolvers = {
  events: async () => {

    // console.log("Started events in eventsResolvers");

    // doesnt need authentication!!


    // return events;
    // This is using the model Event
    // Going to the DB for retrieval with find()
    try {
      // mongoose uses populate() to go and fill any references specified
      // like event model has the created user model that is just referenced by id
      // const events = await Event.find().populate('creator');
      // console.log('events BEFORE DB');
      const events = await Event.find();
      // console.log('events AFTER DB');



      // console.log('events transformEvents BEFORE');
      const transformedEvents = events.map((event) => {
        // Need to return the information for the user who creaed the event
        return transformEvent(event);
      });
      // console.log('events transformEvents AFTER');
      // console.log('transformedEvents: ', transformedEvents);

      return transformedEvents;
    } catch (err) {
      console.log(err);
      throw err;
    }
  },
  // You get acess to your reqest!!
  // all get this!!
  // you can check for auth!!
  createEvent: async (args, req) => {
    // NEED AUTHENTICATION
    // outside try catch because you don't want to catch!!
    if (!req.isAuth) {
      throw new Error("Unautheticated");
    }
    try {
      // How you do it with object literal
      // const event = {
      //   _id: Math.random().toString(),
      //   title: args.eventInput.title,
      //   description: args.eventInput.description,
      //   price: +args.eventInput.price,  // the + converts it to a number or makes sure it is or something
      //   date: args.eventInput.date
      // };
      // can do this
      // console.log(args);
      // To store just in the memory here. NOT HOW YOU DO IT!!
      // events.push(event);
      // TO DB
      const event = new Event({
        title: args.eventInput.title,
        description: args.eventInput.description,
        price: +args.eventInput.price,  // the + converts it to a number or makes sure it is or something
        date: new Date(args.eventInput.date),
        // mongoose will covnert the string for you here
        creator: req.userId
      });

      // Below saves to the DB and works like a promise
      // This is asynch so you need to wait for it to complete
      // console.log('createEvent createEvent BEFORE DB');
      const createdEvent = await event.save();
      // console.log('createEvent createEvent AFTER DB');


      // find the user that created the event
      // console.log('createEvent findById BEFORE DB');
      const creator = await User.findById(req.userId);
      if (!creator) {
        throw new Error('No user associated with this event');
      }
      // console.log('createEvent findById AFTER DB');

      // adding events to the user and then saving it
      // mongoose can pick out the id from the whole object
      // console.log('createEvent creator.createdEvents BEFORE DB');
      creator.createdEvents.push(event);
      await creator.save()
      // console.log('createEvent creator.createdEvents AFTER DB');

      // Use createdEvent._doc because createdEvent itself is a lot because of mongoose
      // the _doc gives you the core stuff
      // console.log('createEvent transformEvent BEFORE');
      const transformedEvent = transformEvent(createdEvent);
      // console.log('createEvent transformEvent AFTER');
      return transformedEvent;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

}

