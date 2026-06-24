const express = require("express");
const router = express.Router();
const db = require("../config/db");

// Get current mess charge
router.get("/", (req, res) => {

  db.query(
    "SELECT * FROM settings WHERE id = 1",
    (err, results) => {

      if (err) {
        return res.status(500).json(err);
      }

      res.json(results[0]);
    }
  );

});

// Update mess charge
router.put("/", (req, res) => {

  const { mess_charge_per_day } = req.body;

  db.query(
    "UPDATE settings SET mess_charge_per_day=? WHERE id=1",
    [mess_charge_per_day],
    (err) => {

      if (err) {
        return res.status(500).json(err);
      }

      res.json({
        message: "Mess charge updated"
      });

    }
  );

});

module.exports = router;