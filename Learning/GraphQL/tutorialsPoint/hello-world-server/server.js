const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const port = process.env.PORT || 9000;
const app = express();

//register middleware
app.use(bodyParser.json(), cors());
app.listen(port, () => console.log(`server is up and running at ${port}`));

// Adding Type Definitions
const typeDefinition = `
   type Query  {
      greeting: String
   }`;

// Adding resolver
const resolverObject = {
  Query: {
    greeting: () => 'Hello GraphQL  From TutorialsPoint !!'
  }
}

const { makeExecutableSchema } = require('graphql-tools');
const schema = makeExecutableSchema({ typeDefs: typeDefinition, resolvers: resolverObject });

const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
//create routes for graphql and graphiql
app.use('/graphql', graphqlExpress({ schema }));
app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

app.listen(port, () => console.log(`server is up and running ${port}`))