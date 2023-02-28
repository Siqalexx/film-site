const router = require('express').Router();
const { getMovies, setMovie, deleteMovie } = require('../controlers/movie');

router.get('/', getMovies);
router.post('/', setMovie);
router.delete('/:_id', deleteMovie);

module.exports = router;
