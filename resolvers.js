exports.resolvers = {
  Query: {
    getAllSongsLists: async (root, args, {Song}) => {
      return await Song.find();
    },
    getPlayList: async(root, {playList}, {Song}) => {
      return await Song.find({playList})
    }
  },
  Mutation: {
    addList: async (root, {name}, {List}) => {
      return await new List({name}).save();
    },
    addSong: async (root, {name, playList}, {Song}) => {
      return await new Song({name, playList}).save();
    }
  }
};