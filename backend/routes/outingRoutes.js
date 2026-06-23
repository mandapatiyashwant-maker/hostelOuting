const express = require("express");

const router = express.Router();

const {
    applyOuting
} = require("../controllers/outingController");

router.post(
    "/apply",
    applyOuting
);

module.exports = router;