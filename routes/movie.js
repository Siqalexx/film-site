const router = require('express').Router();

const { getMovies, setMovie, deleteMovie } = require('../controlers/movie');
const {
  setMovieCelebrate,
  deleteMovieCelebration,
} = require('../utils/celebrate');

router.get('/', getMovies);
router.post('/', setMovieCelebrate(), setMovie);
router.delete('/:_id', deleteMovieCelebration(), deleteMovie);

module.exports = router;
