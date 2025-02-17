const express = require('express');
const router = express.Router();
const { calendlyClickedByUser, calendlyClickedByCompany, addSubscription, sendImprovementEmail } = require('../controllers/actionsController');

router.put('/calendly/:email', calendlyClickedByUser);
router.put('/calendly/company/:email', calendlyClickedByCompany);
router.post('/subscription/', addSubscription);
router.post('/improve-profile/', sendImprovementEmail);

module.exports = router;