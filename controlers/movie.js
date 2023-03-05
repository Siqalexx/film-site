const { CREATE_OBJECT, NOTFOUND_CARD, NOTYOUR_CARD } = require('../constants/constants');
const NotFound = require('../error/NotFound');
const ValidationError = require('../error/ValidationError');
const Forbidden = require('../error/Forbidden');
const { movieModel } = require('../models/movie');

const getMovies = (req, res, next) => {
  movieModel
    .find({ owner: req.user.id })
    .populate('owner')
    .then((movie) => {
      res.send(movie);
    })
    .catch((err) => {
      next(err);
    });
};

const setMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    thumbnail,
    nameRU,
    nameEN,
    movieId,
  } = req.body;
  const { id } = req.user;
  movieModel
    .create({
      country,
      director,
      duration,
      year,
      description,
      image,
      trailerLink: trailer,
      owner: id,
      thumbnail,
      nameRU,
      nameEN,
      movieId,
    })
    .then((movie) => {
      res.status(CREATE_OBJECT).send(movie);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new ValidationError(err.message));
      }
      return next(err);
    });
};

const deleteMovie = (req, res, next) => {
  const { _id } = req.params;
  movieModel
    .findOne({ _id })
    .then((movie) => {
      if (!movie) {
        throw new NotFound(NOTFOUND_CARD);
      }
      if (movie.owner.toString() !== req.user.id) {
        throw new Forbidden(NOTYOUR_CARD);
      }
      movie
        .remove()
        .then((result) => {
          res.send(result);
        })
        .catch(next);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new ValidationError(err.message));
      }
      return next(err);
    });
};
module.exports = {
  getMovies,
  setMovie,
  deleteMovie,
};
