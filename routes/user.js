const router = require('express').Router();

const { getUser, changeUser } = require('../controlers/user');
const { changeUserCelebrate } = require('../utils/celebrate');

router.get('/me', getUser);
router.patch('/me', changeUserCelebrate(), changeUser);

module.exports = router;
