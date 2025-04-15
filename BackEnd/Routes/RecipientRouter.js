const { bloodRequest } = require('../Controllers/bloodRequestController');
const { searchBloodRequest } = require('../Controllers/RequestRetrievalController');
const { bloodRequestValidation } = require('../Middlewares/bloodRequestValidation');
const { validateRequestRetrieval } = require('../Middlewares/RequestRetrievalValidator');

const router = require('express').Router();

router.post('/requestBlood',bloodRequestValidation,bloodRequest);
router.post('/searchBloodRequest',searchBloodRequest,validateRequestRetrieval);

module.exports = router;
