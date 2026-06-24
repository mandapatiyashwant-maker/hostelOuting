const express = require("express");
const router = express.Router();
const db = require("../config/db");

router.get("/stats", (req, res) => {

  db.query("SELECT COUNT(*) AS count FROM students", (err1, students) => {

    db.query("SELECT COUNT(*) AS count FROM outing_requests", (err2, requests) => {

      db.query(
        "SELECT COUNT(*) AS count FROM outing_requests WHERE final_status='Approved'",
        (err3, approved) => {

          db.query(
            "SELECT SUM(deduction_amount) AS total FROM mess_deductions",
            (err4, deductions) => {

              res.json({
                students: students[0].count,
                requests: requests[0].count,
                approved: approved[0].count,
                deductions: deductions[0].total || 0,
              });

            }
          );
        }
      );
    });
  });
});

module.exports = router;