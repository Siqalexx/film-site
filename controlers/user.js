const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const ValidationError = require('../error/ValidationError');
const NotFound = require('../error/NotFound');
const { userModel } = require('../models/user');
const LoginError = require('../error/LoginError');
const Conflict = require('../error/Conflict');
const {
  NOTFOUND_USER,
  UNCORRECT_DATA,
  DOWNLOAD_COOKIE,
  LOGOUT,
} = require('../constants/constants');
const { JWT_SECRET, SECRET_SAUL } = require('../utils/configure');

const PRIVATE_KEY = process.env.JWT_SECRET;

const getUser = (req, res, next) => {
  userModel
    .findOne({ _id: req.user.id })
    .then((users) => {
      res.send(users);
    })
    .catch((err) => {
      next(err);
    });
};

const changeUser = (req, res, next) => {
  const { email, name } = req.body;
  const { id } = req.user;
  userModel
    .findByIdAndUpdate(
      { _id: id },
      { $set: { name, email } },
      {
        new: true,
        runValidators: true,
      },
    )
    .then((user) => {
      if (!user) {
        throw new NotFound(NOTFOUND_USER);
      }
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new ValidationError(err.message));
      }
      if (err.code === 11000) {
        return next(new Conflict(err.message));
      }
      return next(err);
    });
};
const login = (req, res, next) => {
  const { email, password } = req.body;
  userModel
    .findOne({ email })
    .select('+password')
    .then((data) => {
      if (data == null) {
        throw new LoginError(UNCORRECT_DATA);
      }
      bcrypt
        .compare(password, data.password)
        .then((result) => {
          if (!result) {
            throw new LoginError(UNCORRECT_DATA);
          }
          const token = jwt.sign(
            { id: data._id },
            process.env.NODE_ENV === 'production' ? PRIVATE_KEY : JWT_SECRET,
            {
              expiresIn: '7d',
            },
          );
          res
            .cookie('jwt', token, {
              maxAge: 3600000,
              httpOnly: true,
              // secure: true,
              // sameSite: 'None',
            })
            .send({ message: DOWNLOAD_COOKIE });
        })
        .catch(next);
    })
    .catch(next);
};

const registration = (req, res, next) => {
  const { name, email, password } = req.body;
  bcrypt
    .hash(password, SECRET_SAUL)
    .then((passwordHash) => {
      userModel
        .create({
          email,
          password: passwordHash,
          name,
        })
        .then((data) => {
          res.send({
            name: data.name,
            email: data.email,
          });
        })
        .catch((err) => {
          if (err.code === 11000) {
            return next(new Conflict(err.message));
          }
          if (err.name === 'ValidationError') {
            return next(new ValidationError(err.message));
          }
          return next(err);
        });
    })
    .catch(next);
};
const logout = (req, res, next) => {
  try {
    res.cookie('jwt', 'none', { maxAge: 0, httpOnly: true });
    return res.json({ message: LOGOUT });
  } catch (error) {
    return next(error);
  }
};
module.exports = {
  getUser,
  changeUser,
  login,
  registration,
  logout,
};
