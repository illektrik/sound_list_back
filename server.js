const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');
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
app.use(async (req, res, next) => {
  const token = req.headers['authorization'];
 if (token !== null) {
   try {
     req.currentUser = await jwt.verify(token, process.env.SECRET);
   } catch(err) {
      console.error(err);
   }
 }
  next();
});
app.use('/graphiql', graphiqlExpress({endpointURL: '/graphql'}));
app.use('/graphql', bodyParser.json(), graphqlExpress(({currentUser}) => ({
  schema,
  context: {
    List,
    User,
    Song,
    currentUser
  }
}))
);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('DB connected'))
  .catch(err => console.error(err));

const PORT = process.env.PORT || 2222;

app.listen( PORT, () => {
  console.log(`starting server on ${PORT}!!!`);
});


