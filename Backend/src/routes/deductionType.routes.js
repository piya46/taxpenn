const router = require('express').Router();
const dtCtrl = require('../controllers/deductionType.controller');
const { authenticate } = require('../middleware/auth.middleware');

router.get('/', authenticate, dtCtrl.getDeductionType);
router.get('/recommend', authenticate, dtCtrl.checkRecommendType);

module.exports = router;