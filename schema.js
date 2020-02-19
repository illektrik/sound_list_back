exports.typeDefs = `
  type List {
    _id: ID 
    name: String!
    songs: [Song]
  }
  
  type User {
    _id: ID
    username: String! @unique
    password: String!
  }
  
  type Song {
    _id: ID
    name: String!
    playList: String!
  }
  
  type Query {
    getAllSongsLists: [Song]
    getPlayList(playList: String!): [Song]
  }
  
  type Mutation {
    addList(name: String!): List
    addSong(name: String!, playList: String!): Song
  }
`;