const router = require('express').Router();
const taxCtrl = require('../controllers/tax.controller');
const { authenticate } = require('../middleware/auth.middleware');

router.post('/calculate', authenticate, taxCtrl.calculateTax);
router.post('/current-deduction', authenticate, taxCtrl.calculateCurrentDeduction);
router.post('/rec-deduction', authenticate, taxCtrl.calculateRecDeduction);

module.exports = router;