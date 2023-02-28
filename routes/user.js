const router = require('express').Router();
const { getUser, changeUser, logout } = require('../controlers/user');

router.get('/me', getUser);
router.patch('/me', changeUser);
router.get('/signout', logout);
module.exports = router;
