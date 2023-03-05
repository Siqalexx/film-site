const jsonwebtoken = require('jsonwebtoken');
const LoginError = require('../error/LoginError');
// const LoginError = require('../errors/loginError');
const auth = (req, res, next) => {
  const { jwt } = req.cookies;
  if (!jwt) {
    return next(new LoginError('Необходима авторизация'));
  }
  try {
    const payload = jsonwebtoken.verify(
      jwt,
      process.env.NODE_ENV === 'production' ? process.env.JWT_SECRET : 'testkey',
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
