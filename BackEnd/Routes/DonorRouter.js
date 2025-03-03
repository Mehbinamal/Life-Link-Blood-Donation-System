const express = require("express");

const router = express.Router();
const { getAllBloodRequests } = require("../Controllers/RequestRetrievalController");
const { validateRequestRetrieval } = require("../Middlewares/RequestRetrievalValidator");

router.get("/bloodRequests", validateRequestRetrieval, getAllBloodRequests);

module.exports = router;