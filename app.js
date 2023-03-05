require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const userRouter = require('./routes/user');
const movieRouter = require('./routes/movie');
const { auth } = require('./middlewares/auth');
const { cors } = require('./middlewares/cors');
const NotFound = require('./error/NotFound');
const { login, registration, logout } = require('./controlers/user');
const { signInCelebrate, signUpCelebrate } = require('./utils/celebrate');
const { centralHendler } = require('./utils/centralHandler');

mongoose.connect(
  process.env.NODE_ENV === 'production'
    ? process.env.MONGO_URL
    : 'mongodb://localhost:27017/bitfilmsdb'
);

const app = express();

app.use(cors);
app.use(express.json());
app.use(cookieParser());
app.use(requestLogger);

app.post('/signin', signInCelebrate(), login);

app.post('/signup', signUpCelebrate(), registration);

app.get('/signout', logout);

app.use('/users', auth, userRouter);

app.use('/movies', auth, movieRouter);

app.use((req, res, next) => {
  next(new NotFound('Неправильный адрес'));
});

app.use(errorLogger);

app.use(errors());

app.use(centralHendler);

app.listen(
  process.env.NODE_ENV === 'production' ? process.env.PORT : 3000,
  () => console.log('Сервер запущен')
);
