const jsonwebtoken = require('jsonwebtoken');
const { NEED_AUTORIZ } = require('../constants/constants');
const LoginError = require('../error/LoginError');
const { JWT_SECRET } = require('../utils/configure');
// const LoginError = require('../errors/loginError');
const auth = (req, res, next) => {
  const { jwt } = req.cookies;
  if (!jwt) {
    return next(new LoginError(NEED_AUTORIZ));
  }
  try {
    const payload = jsonwebtoken.verify(
      jwt,
      process.env.NODE_ENV === 'production'
        ? process.env.JWT_SECRET
        : JWT_SECRET,
    );
    req.user = payload;
  } catch (error) {
    return next(new LoginError(error.message)); // отправляем кастомную ошибку авторизации
  }
  return next();
};

module.exports = {
  auth,
};
