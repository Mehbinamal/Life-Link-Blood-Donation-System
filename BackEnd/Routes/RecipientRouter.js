const { bloodRequest } = require('../Controllers/bloodRequestController');
const { bloodRequestValidation } = require('../Middlewares/bloodRequestValidation');

const router = require('express').Router();

router.post('/requestBlood',bloodRequestValidation,bloodRequest);

module.exports = router;
