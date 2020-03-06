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
  
  type Token {
    token: String!
  }
  
  type Query {
    getAllSongsLists: [Song]
    getPlayList(playList: String!): [Song]
    getAllLists: [List]
    getCurrentUser: User
  }
  
  type Mutation {
    addList(name: String!): List
    addSong(name: String!, playList: String!, link: String!, author: String!): Song
    deleteSong(_id: ID!): Song
    changeSong(_id: ID!, name: String!, playList: String!, link: String!, author: String!): Song
    deleteList(_id: ID!): List
    changeList(_id: ID!, name: String!): List
    signupUser(username: String!, password: String!): Token
    signinUser(username: String!, password: String!): Token
  }
`;