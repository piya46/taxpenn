const router = require('express').Router();
const userCtrl = require('../controllers/user.controller');
const { authenticate } = require('../middleware/auth.middleware');

router.get('/me', authenticate, userCtrl.getProfile);

module.exports = router;