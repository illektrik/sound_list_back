const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config({path: 'variables.env'});

const { graphiqlExpress, graphqlExpress} = require('apollo-server-express');
const { makeExecutableSchema } = require('graphql-tools');

const User = require('./models/User');
const List = require('./models/List');
const Song = require('./models/Song');

const { typeDefs } = require('./schema');
const { resolvers } = require('./resolvers');

const schema = makeExecutableSchema({
  typeDefs: typeDefs,
  resolvers: resolvers
});

const app = express();
const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true
};

app.use(cors(corsOptions));
app.use('/graphiql', graphiqlExpress({endpointURL: '/graphql'}));
app.use('/graphql', bodyParser.json(), graphqlExpress({
  schema,
  context: {
    List,
    User,
    Song
  }
}));

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('DB connected'))
  .catch(err => console.error(err));

const PORT = process.env.PORT || 2222;

app.listen( PORT, () => {
  console.log(`starting server on ${PORT}!!!`);
});


