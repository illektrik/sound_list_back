exports.resolvers = {

  Query: {
    getAllSongsLists: async (root, args, {Song}) => {
      return await Song.find();
    },
    getPlayList: async(root, {playList}, {Song}) => {
      return await Song.find({playList})
    },
    getAllLists: async (root, args, {List}) => {
      return await List.find();
    }
  },

  Mutation: {
    addList: async (root, {name}, {List}) => {
      return await new List({name}).save();
    },
    addSong: async (root, {name, playList}, {Song}) => {
      return await new Song({name, playList}).save();
    },
    deleteSong: async (root, {_id}, {Song}) => {
      return await Song.deleteOne({_id});
    }
  }
};