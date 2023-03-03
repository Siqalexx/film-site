const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { getUser, changeUser, logout } = require('../controlers/user');

router.get('/me', getUser);
router.patch(
  '/me',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      email: Joi.string().required().email(),
    }),
  }),
  changeUser,
);
router.get('/signout', logout);
module.exports = router;
