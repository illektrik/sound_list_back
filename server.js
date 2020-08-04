const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
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
  origin: 'http://beatfeed.herokuapp.com/',
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
// app.use('/graphiql', graphiqlExpress({endpointURL: '/graphql'}));
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

if(process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendfile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 2222;

app.listen( PORT, () => {
  console.log(`starting server on ${PORT}!!!`);
});


