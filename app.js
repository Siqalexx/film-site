require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { cors } = require('./middlewares/cors');
const NotFound = require('./error/NotFound');
const { centralHendler } = require('./utils/centralHandler');
const { ADRESS_ERROR, START_SERVER } = require('./constants/constants');
const { PORT, MONGO_URL } = require('./utils/configure');
const limiter = require('./utils/rateLimiter');
const router = require('./routes/index');

mongoose.connect(
  process.env.NODE_ENV === 'production' ? process.env.MONGO_URL : MONGO_URL,
);

const app = express();

app.use(cors);
app.use(express.json());
app.use(cookieParser());
app.use(helmet());
app.use(limiter);
app.use(requestLogger);

app.use(router);

app.use((req, res, next) => {
  next(new NotFound(ADRESS_ERROR));
});

app.use(errorLogger);

app.use(errors());

app.use(centralHendler);

app.listen(
  process.env.NODE_ENV === 'production' ? process.env.PORT : PORT,
  () => console.log(START_SERVER),
);
