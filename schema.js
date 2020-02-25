exports.typeDefs = `
  type List {
    _id: ID 
    name: String!
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
    link: String!
    author: String!
  }
  
  type Query {
    getAllSongsLists: [Song]
    getPlayList(playList: String!): [Song]
    getAllLists: [List]
  }
  
  type Mutation {
    addList(name: String!): List
    addSong(name: String!, playList: String!, link: String!): Song
    deleteSong(_id: ID!): Song
  }
`;