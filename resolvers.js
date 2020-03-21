const jwt = require('jsonwebtoken');

const createToken = (user, secret, expiresIn) => {
  const {username} = user;

  return jwt.sign({username}, secret, {expiresIn})
};

exports.resolvers = {

  Query: {
    getAllSongsLists: async (root, args, {Song}) => {
      return await Song.find();
    },
    getPlayList: async(root, {playListId}, {Song}) => {
      return await Song.find({playListId})
    },
    getAllLists: async (root, args, {List}) => {
      return await List.find();
    },
    getCurrentUser: async (root, args, {currentUser, User}) => {
      if (!currentUser) {
        return null;
      }
      const user = await User.findOne({username: currentUser.username});
      return user;
    }
  },

  Mutation: {
    addList: async (root, {name}, {List}) => {
      return await new List({name}).save();
    },
    addSong: async (root, {name, link, author, playListId}, {Song}) => {
      return await new Song({name, link, author, playListId}).save();
    },
    deleteSong: async (root, {_id}, {Song}) => {
      return await Song.deleteOne({_id});
    },
    changeSong: async (root, {_id, name, playList, link, author}, {Song}) => {
      return await Song.findByIdAndUpdate(
        {_id},
        {$set: {
            name,
            playList,
            link,
            author
          }},
        {new: true}
      )
    },
    deleteList: async (root, {_id}, {List}) => {
      return await List.deleteOne({_id});
    },
    changeList: async (root, {_id, name}, {List}) => {
      return await List.findByIdAndUpdate(
        {_id},
        {$set: {name}},
        {new: true}
      )
    },
    signupUser: async(root, {username, password}, {User}) => {
      const newUser = await new User({
        username,
        password
      }).save();
      return { token: createToken(newUser, process.env.SECRET, '1hr')}
    },
    signinUser: async(root, {username, password}, {User}) => {
       const user = await User.findOne({username, password});
       if (!user) {
         throw new Error('User not found!');
       }
      return { token: createToken(user, process.env.SECRET, '1000hr')}
    }
  }
};