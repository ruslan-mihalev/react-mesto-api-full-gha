const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { DocumentNotFoundError, ValidationError } = require('mongoose').Error;
const User = require('../models/user');
const {
  HttpError, NotFoundError, BadRequestError, UnauthorizedError, ConflictError,
} = require('../middlewares/errors');

const { HTTP_CODE_CREATED } = require('../utils/httpCodes');
const {
  WRONG_EMAIL_OR_PASSWORD,
  USER_WITH_EMAIL_ALREADY_EXISTS,
} = require('../utils/errorMessages');

const MILLISECONDS_IN_WEEK = 7 * 24 * 60 * 60 * 1000;

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => {
      res.send(users);
    })
    .catch(next);
};

const getUserById = (userId, res, next) => {
  User.findById(userId)
    .orFail()
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if (err instanceof DocumentNotFoundError) {
        next(new NotFoundError(`Пользователь по указанному ${userId} не найден.`));
      } else {
        next(err);
      }
    });
};

module.exports.getUserById = (req, res, next) => {
  const { userId } = req.params;
  return getUserById(userId, res, next);
};

module.exports.getCurrentUser = (req, res, next) => {
  const { _id: userId } = req.user;
  return getUserById(userId, res, next);
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
      res
        .cookie('jwt', token, { maxAge: MILLISECONDS_IN_WEEK, httpOnly: true })
        .send({ email })
        .end();
    })
    .catch((err) => {
      if (err instanceof HttpError) {
        next(err);
      } else {
        next(new UnauthorizedError(WRONG_EMAIL_OR_PASSWORD));
      }
    });
};

module.exports.createUser = (req, res, next) => {
  const {
    email, password, name, about, avatar,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      email, password: hash, name, about, avatar,
    }))
    .then((user) => {
      res.status(HTTP_CODE_CREATED).send({ data: user.copyWithoutPassword() });
    })
    .catch((err) => {
      if (err.code === 11000) {
        next(new ConflictError(USER_WITH_EMAIL_ALREADY_EXISTS));
      } else if (err instanceof ValidationError) {
        next(new BadRequestError(WRONG_EMAIL_OR_PASSWORD));
      } else {
        next(err);
      }
    });
};

const updateUser = (userId, patch, res, next) => {
  User.findByIdAndUpdate(
    userId,
    patch,
    { new: true, runValidators: true },
  )
    .orFail()
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if (err instanceof DocumentNotFoundError) {
        next(new NotFoundError());
      } else if (err instanceof ValidationError) {
        next(new BadRequestError());
      } else {
        next(err);
      }
    });
};

module.exports.updateUser = (req, res, next) => {
  const { _id: userId } = req.user;
  const { name, about } = req.body;
  updateUser(userId, { name, about }, res, next);
};

module.exports.updateAvatar = (req, res, next) => {
  const { _id: userId } = req.user;
  const { avatar } = req.body;
  updateUser(userId, { avatar }, res, next);
};
