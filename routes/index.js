const router = require('express').Router();
const userRouter = require('./user');
const movieRouter = require('./movie');
const { login, registration, logout } = require('../controlers/user');
const { auth } = require('../middlewares/auth');
const { signInCelebrate, signUpCelebrate } = require('../utils/celebrate');

router.post('/signin', signInCelebrate(), login);

router.post('/signup', signUpCelebrate(), registration);

router.get('/signout', logout);

router.use('/users', auth, userRouter);

router.use('/movies', auth, movieRouter);

module.exports = router;
