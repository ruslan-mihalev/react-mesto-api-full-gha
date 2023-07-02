const jwt = require('jsonwebtoken');
const { UnauthorizedError } = require('./errors');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    try {
      req.user = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
      next();
    } catch (err) {
      next(new UnauthorizedError());
    }
  } else {
    next(new UnauthorizedError());
  }
};
