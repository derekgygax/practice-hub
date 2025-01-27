import express from 'express';
import bodyParser from 'body-parser';
import { graphqlHTTP } from 'express-graphql';

import mongoose from 'mongoose';

import { graphqlSchema } from './graphql/schema/index.js';
import { graphqlResolvers } from './graphql/resolvers/index.js';

import isAuth from './middleware/is-auth.js';

import v8 from 'v8';


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

// CORS!!!
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST,GET,OPTIONS');
  // Content-Type when not using Apollo
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  // telling its ok here
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
})

// This is now used as middleware!!!
// That means it is hit and processed before the graphql stuff is hit
// This is changing the header coming in at ever request to add
// authentication
app.use(isAuth);

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
  schema: graphqlSchema,
  // Resolver functions in rootValue
  // They need to match schema endpoints by name
  // They are async because they are hitting the DB!!
  rootValue: graphqlResolvers,
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

// Enable Mongoose debug mode
// mongoose.set('debug', true);

// DB address here
mongoose.connect(
  `mongodb://${process.env.MONGO_USER
  }:${process.env.MONGO_PASSWORD
  }@localhost:27017/${process.env.MONGO_DB}?retryWrites=true&w=majority`,
  {
    // The following is NEEDED because you created the user
    // in the admin DB!
    authSource: "admin"
  }
).then(() => {
  app.listen(8000);
}).catch(err => {
  console.log(err);
});


