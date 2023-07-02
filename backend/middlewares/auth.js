const jwt = require('jsonwebtoken');
const { UnauthorizedError } = require('./errors');

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    try {
      req.user = jwt.verify(token, process.env.JWT_SECRET);
      next();
    } catch (err) {
      next(new UnauthorizedError());
    }
  } else {
    next(new UnauthorizedError());
  }
};
