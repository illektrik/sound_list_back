const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const SongSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  playList: {
    type: String,
    required: true
  },
  playListId: {
    type: String,
    required: true
  },
  link: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Song', SongSchema);