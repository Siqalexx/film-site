const { celebrate, Joi } = require('celebrate');
const { REGEPX_URL, REGEPX_EMAIL } = require('../constants/constants');

const setMovieCelebrate = () => celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().regex(REGEPX_URL),
    trailer: Joi.string().required().regex(REGEPX_URL),
    thumbnail: Joi.string().required().regex(REGEPX_URL),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
    movieId: Joi.number().required(),
  }),
});

const deleteMovieCelebration = () => celebrate({
  params: Joi.object().keys({
    _id: Joi.string().required().hex().length(24),
  }),
});
const signInCelebrate = () => celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().regex(REGEPX_EMAIL),
    password: Joi.string().required(),
  }),
});
const signUpCelebrate = () => celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().regex(REGEPX_EMAIL),
    password: Joi.string().required(),
  }),
});
const changeUserCelebrate = () => celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().regex(REGEPX_EMAIL),
  }),
});
module.exports = {
  setMovieCelebrate,
  deleteMovieCelebration,
  signInCelebrate,
  signUpCelebrate,
  changeUserCelebrate,
};
