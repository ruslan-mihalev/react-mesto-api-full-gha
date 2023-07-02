const router = require('express').Router();
const {
  NotFoundError,
} = require('../middlewares/errors');

router.use('/cards', require('./cards'));
router.use('/users', require('./users'));

router.use((req, res, next) => {
  next(new NotFoundError('Неправильный путь'));
});

module.exports = router;
