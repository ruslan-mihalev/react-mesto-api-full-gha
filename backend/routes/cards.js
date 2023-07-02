const router = require('express').Router();
const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  unlikeCard,
} = require('../controllers/cards');
const {
  POST_CARD_VALIDATOR,
  DELETE_CARD_VALIDATOR,
  PUT_CARD_LIKES_VALIDATOR,
  DELETE_CARD_LIKES_VALIDATOR,
} = require('../utils/validators');

router.get('/', getCards);
router.post('/', POST_CARD_VALIDATOR, createCard);
router.delete('/:cardId', DELETE_CARD_VALIDATOR, deleteCard);
router.put('/:cardId/likes', PUT_CARD_LIKES_VALIDATOR, likeCard);
router.delete('/:cardId/likes', DELETE_CARD_LIKES_VALIDATOR, unlikeCard);

module.exports = router;
