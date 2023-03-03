const mongoose = require('mongoose');
const { validationAvatar } = require('../utils/validationAvatar');

const movieSchema = mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    validate: validationAvatar,
  },
  trailerLink: {
    type: String,
    required: true,
    validate: validationAvatar,
  },
  thumbnail: {
    type: String,
    required: true,
    validate: validationAvatar,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  movieId: {
    type: Number,
    required: true,
  },
  nameRU: {
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
    required: true,
  },
});

module.exports.movieModel = mongoose.model('movie', movieSchema);
