const express = require("express");

const router = express.Router();
const { getAllBloodRequests, getBloodRequestByID } = require("../Controllers/RequestRetrievalController");
const { validateRequestRetrieval } = require("../Middlewares/RequestRetrievalValidator");
const { acceptRequest } = require('../Controllers/donationController');
const validateRequest = require('../Middlewares/validateRequest');

router.get("/bloodRequests", validateRequestRetrieval, getAllBloodRequests);
router.get("/detailedRequest/:id", validateRequestRetrieval, getBloodRequestByID);
router.post('/acceptRequest/:requestId/:donorEmail', validateRequest, acceptRequest)


module.exports = router;