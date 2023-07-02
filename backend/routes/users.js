const router = require('express').Router();
const {
  getCurrentUser,
  getUsers,
  getUserById,
  updateUser,
  updateAvatar,
} = require('../controllers/users');
const {
  GET_USER,
  PATCH_USER_ME,
  PATCH_USER_ME_AVATAR,
} = require('../utils/validators');

router.get('/', getUsers);
router.get('/me', getCurrentUser);
router.get('/:userId', GET_USER, getUserById);
router.patch('/me', PATCH_USER_ME, updateUser);
router.patch('/me/avatar', PATCH_USER_ME_AVATAR, updateAvatar);

module.exports = router;
