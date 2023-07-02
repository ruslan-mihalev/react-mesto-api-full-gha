const { DocumentNotFoundError, ValidationError } = require('mongoose').Error;
const Card = require('../models/card');
const {
  BadRequestError, NotFoundError, ForbiddenError,
} = require('../middlewares/errors');
const { HTTP_CODE_CREATED } = require('../utils/httpCodes');
const { ATTEMPT_TO_DELETE_CARD_FOR_ANOTHER_USER } = require('../utils/errorMessages');

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .populate(['owner', 'likes'])
    .then((cards) => {
      res.send(cards);
    })
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;

  Card.create({
    name,
    link,
    owner: req.user._id,
  })
    .then((card) => {
      res.status(HTTP_CODE_CREATED).send(card);
    })
    .catch((err) => {
      if (err instanceof ValidationError) {
        next(new BadRequestError());
      } else {
        next(err);
      }
    });
};

module.exports.deleteCard = (req, res, next) => {
  const { cardId } = req.params;
  const { _id: userId } = req.user;

  Card.findById(cardId)
    .populate(['owner', 'likes'])
    .orFail()
    .then((card) => {
      const { owner: { _id: ownerId } } = card;
      if (ownerId.equals(userId)) {
        return card.deleteOne();
      }

      return Promise.reject(new ForbiddenError(ATTEMPT_TO_DELETE_CARD_FOR_ANOTHER_USER));
    })
    .then((card) => {
      res.send(card);
    })
    .catch((err) => {
      if (err instanceof DocumentNotFoundError) {
        next(new NotFoundError());
      } else {
        next(err);
      }
    });
};

module.exports.likeCard = (req, res, next) => {
  const { cardId } = req.params;

  Card.findByIdAndUpdate(
    cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .populate(['owner', 'likes'])
    .orFail()
    .then((card) => {
      res.send(card);
    })
    .catch((err) => {
      if (err instanceof DocumentNotFoundError) {
        next(new NotFoundError());
      } else {
        next(err);
      }
    });
};

module.exports.unlikeCard = (req, res, next) => {
  const { cardId } = req.params;

  Card.findByIdAndUpdate(
    cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .populate(['owner', 'likes'])
    .orFail()
    .then((card) => {
      res.send(card);
    })
    .catch((err) => {
      if (err instanceof DocumentNotFoundError) {
        next(new NotFoundError());
      } else {
        next(err);
      }
    });
};
