const { SERVER_ERROR } = require('../constants/constants');

module.exports.centralHendler = (err, req, res, next) => {
  const { message, status = 500 } = err;
  if (status !== 500) {
    res.status(status).send({
      message,
    });
  } else {
    console.log(message);
    res.status(status).send({
      message: SERVER_ERROR,
    });
  }
  next();
};
