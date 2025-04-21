const router = require('express').Router();
const docCtrl = require('../controllers/document.controller');
const { authenticate } = require('../middleware/auth.middleware');

router.post('/', authenticate, docCtrl.uploadDocument);
router.put('/:id', authenticate, docCtrl.editDocument);
router.get('/:id/history', authenticate, docCtrl.getHistory);

module.exports = router;