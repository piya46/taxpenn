const router = require('express').Router();
const authCtrl = require('../controllers/auth.controller');

router.post('/register', authCtrl.register);
router.post('/login', authCtrl.login);
router.post('/forgot-password', authCtrl.forgotPassword);
router.post('/reset-password', authCtrl.resetPassword);

module.exports = router;