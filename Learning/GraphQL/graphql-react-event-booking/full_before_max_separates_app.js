import express from 'express';
import bodyParser from 'body-parser';
import { graphqlHTTP } from 'express-graphql';
import { buildSchema } from 'graphql';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

import { Event } from './models/event.js';
import { User } from './models/user.js';

// Uses MongoDB database
// Connecting to MongoDB online on the cloud version
// username: derekgygax
// password: hI2KtzkrQm3PKITi
// ip address: 183.88.135.77/32    // this is my local ip address
// nodemon.json
//    to hold the DB credentials

const app = express();

// const events = [];

app.use(bodyParser.json());

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
      return {
        ...event._doc,
        creator: user(event._doc.creator)
      }
    });
  } catch (err) {
    throw err;
  }
}

const user = async (userId) => {
  try {

    const user = await User.findById(userId);
    return {
      ...user._doc,
      createdEvents: events(user._doc.createdEvents)
    }
  } catch (err) {
    throw err;
  }
}

// You have only 1 endpoint!
// generally its named as such (convention like) but it could be anything
// app.use(
//   end point,
//   middleware - where do you find schema, resolvers, ...,
// )
app.use('/graphql', graphqlHTTP({
  // You need it written this way!!
  // The ` is used for a many lined string
  // needs type, schema, query, mutation!!!
  // RootQuery is bundling all supported Queries
  // RootMutation is bundling all supported Mutations
  // once you get inside the Root### it can get to whatever
  // but above that its standard practice to use
  // events: [Event!]! = events returns a lits of events, it has to be an event, no null values. Could be an empty list, but NO null
  // createEvent(name: String): String = function createEvent takes the one argument name that is a string and returns one value, a string
  // The ! after the type means NOT nullable. Has to be real and a value
  // type for types
  // input for a list of arguments
  // This just built the points BUT you need the resolvers to have the functions
  //    MUST follow names!! in the acceptor thing and the resolver
  // query and mutation names can NOT be the same, they will clash!!!
  schema: buildSchema(`
    type Event {
      _id: ID!
      title: String!
      description: String!
      price: Float!
      date: String!
      creator: User!
    }

    type User {
      _id: ID!
      email: String!
      password: String
      createdEvents: [Event!]
    }

    input EventInput {
      title: String!
      description: String!
      price: Float!
      date: String!
    }

    input UserInput {
      email: String!
      password: String!
    }

    type RootQuery {
      events: [Event!]!
    }

    type RootMutation {
      createEvent(eventInput: EventInput): Event
      createUser(userInput: UserInput): User
    }

    schema {
      query: RootQuery
      mutation: RootMutation
    }
  `),
  // Resolver functions in rootValue
  // They need to match schema endpoints by name
  // They are async because they are hitting the DB!!
  rootValue: {
    events: async () => {
      // return events;
      // This is using the model Event
      // Going to the DB for retrieval with find()
      try {
        // mongoose uses populate() to go and fill any references specified
        // like event model has the created user model that is just referenced by id
        // const events = await Event.find().populate('creator');
        const events = await Event.find();
        return events.map((event) => {
          // Need to return the information for the user who creaed the event
          return {
            ...event._doc,
            // Maybe you used to need below but now it works on its own
            // the native id turns into a string for us that it didn't used to do
            // _id: event._doc._id.toString()
            // Max does it like this but I don't think we need the this crap so no bind
            // creator: user.bind(this, event._doc.creator)
            creator: user(event._doc.creator)
          };
        })
      } catch (err) {
        console.log(err);
        throw err;
      }
    },
    // First one written
    // hahahaha look at the events he made up
    // events: () => {
    //   return ['Romantic Cooking', 'Sailing', 'All-Night Coding']
    // },
    // args comes in as an object with what you defined above
    // createEvent: (args) => {
    //   const eventName = args.name;
    //   return eventName;
    // }
    // THIS IS TEH createEvent resolver!!
    createEvent: async (args) => {

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
          creator: '6583b3a1d7e490e1923b9a07'
        });

        // Below saves to the DB and works like a promise
        // This is asynch so you need to wait for it to complete
        const createdEvent = await event.save();

        // find the user that created the event
        const foundUser = await User.findById('6583b3a1d7e490e1923b9a07');
        if (!foundUser) {
          throw new Error('No user associated with this event');
        }

        // adding events to the user and then saving it
        // mongoose can pick out the id from the whole object
        foundUser.createdEvents.push(event);
        await foundUser.save()

        // Use createdEvent._doc because createdEvent itself is a lot because of mongoose
        // the _doc gives you the core stuff
        return {
          ...createdEvent._doc,
          creator: user(createdEvent._doc.creator)
        };
      } catch (err) {
        console.log(err);
        throw err;
      }
    },
    // TODO 
    // This is a HUGE security flaw!!!!
    // This puts the passwords as plain text and that is AWFUL!!
    // You need to fix this!!
    // Do it like this!
    // You need a hashed password that can't be decrypted
    // USE THE PACKAGE
    //  bcryptjs to do to cryptographic stuff
    // Then the cryptographic made passwords can be compared to each other
    // for login but NEVER saved as a string!!
    // createUser: async (args) => {
    //   const user = new User({
    //     email: args.userInput.email,
    //     password: args.userInput.password
    //   });
    // }
    // YOU MUST DO THE FOLLOWING!!!
    createUser: async (args) => {

      try {
        // Make sure the same user can't be created!!
        // The {} is filter
        // This will always return something, user can be undefined
        // If there is no user already created!!
        const oldUser = await User.findOne({ email: args.userInput.email })
        if (oldUser) {
          throw new Error("User exists already.");
        }

        // hash the password!!
        // Second argument is the amount of salting.
        // 12 rounds of salting was considered safe in 2018. NOW idk
        // It is asynchronous!!
        const hashedPassword = await bcrypt.hash(args.userInput.password, 12);

        // create user with hashed password
        const user = new User({
          email: args.userInput.email,
          password: hashedPassword
        });

        // Save to the DB and return
        const result = await user.save();
        // REMEMBER YOU DON"T EVER WANT TO RETURN THE PASSWORD!!!
        // THAT IS ALSO A SECURITY FLAW AND YOU WOULD NEVER NEED IT!!!
        return {
          ...result._doc,
          password: null
        };

      } catch (err) {
        throw err;
      }
    }
  },
  // graphiql: true
  // The above property that you actually are using later
  // gives you a debugger to go to at http://localhost:3000/graphql
  // so you can test queries and mutations
  // ex.
  // query GetEvents {
  //   events 
  // }
  // response
  // {
  //   "data": {
  //     "events": [
  //       "Romantic Cooking",
  //       "Sailing",
  //       "All-Night Coding"
  //     ]
  //   }
  // }
  // ex.
  // mutation {
  //   createEvent(name: "Sports")
  // }
  // response
  // {
  //   "data": {
  //     "createEvent": "Sports"
  //   }
  // }
  // ex.
  // query {
  //   events {
  //     title,
  //     price
  //   }
  // }
  graphiql: true
}))

// DB address here
mongoose.connect(
  `mongodb+srv://${process.env.MONGO_USER
  }:${process.env.MONGO_PASSWORD
  }@cluster0.savddfh.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`
).then(() => {
  app.listen(3000);
}).catch(err => {
  console.log(err);
});


