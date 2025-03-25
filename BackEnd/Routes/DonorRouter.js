const express = require("express");

const router = express.Router();
const { getAllBloodRequests, getBloodRequestByID } = require("../Controllers/RequestRetrievalController");
const { validateRequestRetrieval } = require("../Middlewares/RequestRetrievalValidator");
const { acceptRequest,getDonationHistory } = require('../Controllers/donationController');
const validateRequest = require('../Middlewares/validateRequest');
const { updateLastDonationDate } = require('../Controllers/UpdateLastDonationController');
const validateUserAndDate = require('../Middlewares/validateUserAndDate');

router.get("/bloodRequests", validateRequestRetrieval, getAllBloodRequests);
router.get("/detailedRequest/:id", validateRequestRetrieval, getBloodRequestByID);
router.post('/acceptRequest/:requestId/:donorEmail', validateRequest, acceptRequest)
router.get('/donationHistory/:email', getDonationHistory);
router.put('/updateLastDonationDate/:email', validateUserAndDate, updateLastDonationDate);


module.exports = router;