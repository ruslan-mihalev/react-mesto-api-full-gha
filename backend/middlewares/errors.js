const {
  DEFAULT_MESSAGE_FOR_HTTP_CODE_BAD_REQUEST,
  DEFAULT_MESSAGE_FOR_HTTP_CODE_UNAUTHORIZED,
  DEFAULT_MESSAGE_FOR_HTTP_CODE_FORBIDDEN,
  DEFAULT_MESSAGE_FOR_HTTP_CODE_NOT_FOUND,
  DEFAULT_MESSAGE_FOR_HTTP_CODE_CONFLICT,
  DEFAULT_MESSAGE_FOR_HTTP_CODE_INTERNAL_SERVER_ERROR,
} = require('../utils/errorMessages');
const {
  HTTP_CODE_BAD_REQUEST,
  HTTP_CODE_UNAUTHORIZED,
  HTTP_CODE_FORBIDDEN,
  HTTP_CODE_NOT_FOUND,
  HTTP_CODE_CONFLICT,
  HTTP_CODE_INTERNAL_SERVER_ERROR,
} = require('../utils/httpCodes');

class HttpError extends Error {
  constructor(name, message, statusCode) {
    super(message);
    this.name = name;
    this.statusCode = statusCode;
  }
}

/**
 * 400 - переданы некорректные данные в методы
 * создания карточки, пользователя, обновления аватара пользователя или профиля
 */
class BadRequestError extends HttpError {
  constructor(message = DEFAULT_MESSAGE_FOR_HTTP_CODE_BAD_REQUEST) {
    super('BadRequestError', message, HTTP_CODE_BAD_REQUEST);
  }
}

/**
 * 401 - передан неверный логин или пароль.
 * Также эту ошибку возвращает авторизационный middleware, если передан неверный JWT
 */
class UnauthorizedError extends HttpError {
  constructor(message = DEFAULT_MESSAGE_FOR_HTTP_CODE_UNAUTHORIZED) {
    super('UnauthorizedError', message, HTTP_CODE_UNAUTHORIZED);
  }
}

/**
 * 403 - попытка удалить чужую карточку
 */
class ForbiddenError extends HttpError {
  constructor(message = DEFAULT_MESSAGE_FOR_HTTP_CODE_FORBIDDEN) {
    super('ForbiddenError', message, HTTP_CODE_FORBIDDEN);
  }
}

/**
 * 404 - карточка или пользователь не найден или был запрошен несуществующий роут
 */
class NotFoundError extends HttpError {
  constructor(message = DEFAULT_MESSAGE_FOR_HTTP_CODE_NOT_FOUND) {
    super('NotFoundError', message, HTTP_CODE_NOT_FOUND);
  }
}

/**
 * 409 - при регистрации указан email, который уже существует на сервере
 */
class ConflictError extends HttpError {
  constructor(message = DEFAULT_MESSAGE_FOR_HTTP_CODE_CONFLICT) {
    super('ConflictError', message, HTTP_CODE_CONFLICT);
  }
}

const errorsHandler = (err, req, res, next) => { // eslint-disable-line no-unused-vars
  if (err && err instanceof HttpError) {
    res.status(err.statusCode).send({ message: err.message });
  } else {
    res.status(HTTP_CODE_INTERNAL_SERVER_ERROR)
      .send({ message: DEFAULT_MESSAGE_FOR_HTTP_CODE_INTERNAL_SERVER_ERROR });
  }
};

module.exports = {
  errorsHandler,
  HttpError,
  BadRequestError,
  UnauthorizedError,
  ForbiddenError,
  NotFoundError,
  ConflictError,
};
