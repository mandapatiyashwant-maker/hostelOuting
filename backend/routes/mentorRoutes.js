const express = require("express");
const router = express.Router();

const {
  getRequests,
  approveRequest,
} = require("../controllers/mentorController");

router.get("/", getRequests);
router.put("/approve/:id", approveRequest);

module.exports = router;