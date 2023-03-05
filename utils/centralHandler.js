module.exports.centralHendler = (err, req, res, next) => {
  const { message, status = 500 } = err;
  if (status !== 500) {
    res.status(status).send({
      message,
    });
  } else {
    console.log(message);
    res.status(status).send({
      message: 'Ошибка сервера',
    });
  }
  next();
};
