const express = require("express");

const router = express.Router();
const { getAllBloodRequests, getBloodRequestByID } = require("../Controllers/RequestRetrievalController");
const { validateRequestRetrieval } = require("../Middlewares/RequestRetrievalValidator");

router.get("/bloodRequests", validateRequestRetrieval, getAllBloodRequests);
router.get("/detailedRequest/:id", validateRequestRetrieval, getBloodRequestByID);


module.exports = router;