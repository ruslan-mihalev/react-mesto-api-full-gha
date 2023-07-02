const {
  celebrate, Joi, Segments,
} = require('celebrate');
const { ObjectId } = require('mongoose').Types;

const IMAGE_URL_REGEX = /^https?:\/\/[w{3}]?[\w\-\.]+\.[a-z]{2,}[\(\)\[\]\w\.,;:'~\-\+\*\/=\?!@\$&#%]*$/i; //eslint-disable-line

/**
 * Original: (https://www.geeksforgeeks.org/how-to-check-if-a-string-is-valid-mongodb-objectid-in-node-js/)
 */
const isValidObjectId = (id) => {
  if (ObjectId.isValid(id)) {
    return String(new ObjectId(id)) === id;
  }
  return false;
};

const createObjectIdValidator = (paramName) => (value, helpers) => {
  if (!isValidObjectId(value)) {
    return helpers.message(`Invalid param type. '${paramName}' have to be 'mongoose.Types.ObjectId'`);
  }

  return value;
};

const POST_SIGNUP = celebrate({
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().regex(IMAGE_URL_REGEX),
  }),
});
const POST_SIGNIN = celebrate({
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
});

const GET_USER = celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    userId: Joi.string().required().custom(createObjectIdValidator('userId')),
  }),
});
const PATCH_USER_ME = celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
});
const PATCH_USER_ME_AVATAR = celebrate({
  [Segments.BODY]: Joi.object().keys({
    avatar: Joi.string().required().regex(IMAGE_URL_REGEX),
  }),
});

const POST_CARD_VALIDATOR = celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().regex(IMAGE_URL_REGEX),
  }),
});
const DELETE_CARD_VALIDATOR = celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    cardId: Joi.string().required().custom(createObjectIdValidator('cardId')),
  }),
});
const PUT_CARD_LIKES_VALIDATOR = celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    cardId: Joi.string().required().custom(createObjectIdValidator('cardId')),
  }),
});
const DELETE_CARD_LIKES_VALIDATOR = celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    cardId: Joi.string().required().custom(createObjectIdValidator('cardId')),
  }),
});

module.exports = {
  IMAGE_URL_REGEX,
  POST_SIGNUP,
  POST_SIGNIN,
  GET_USER,
  PATCH_USER_ME,
  PATCH_USER_ME_AVATAR,
  POST_CARD_VALIDATOR,
  DELETE_CARD_VALIDATOR,
  PUT_CARD_LIKES_VALIDATOR,
  DELETE_CARD_LIKES_VALIDATOR,
};
