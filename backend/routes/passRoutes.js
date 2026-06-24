const express = require("express");
const router = express.Router();
const db = require("../config/db");

const { getPass } = require("../controllers/passController");

// =====================================
// GET ALL PASSES
// =====================================
router.get("/", getPass);

// =====================================
// CALCULATE MESS DEDUCTIONS
// =====================================
router.post("/calculate-deduction", (req, res) => {

  db.query(
    `
    SELECT
      op.id,
      o.student_id,
      o.out_date,
      o.return_date
    FROM outing_passes op
    JOIN outing_requests o
      ON op.outing_request_id = o.id
    `,
    (err, passes) => {

      if (err) {
        console.log(err);
        return res.status(500).json(err);
      }

      if (passes.length === 0) {
        return res.json({
          message: "No passes found"
        });
      }

      // GET MESS CHARGE FROM SETTINGS
      db.query(
        "SELECT mess_charge_per_day FROM settings WHERE id = 1",
        (settingErr, settingResult) => {

          if (settingErr) {
            console.log(settingErr);
            return res.status(500).json(settingErr);
          }

          const chargeFromDatabase =
            settingResult[0].mess_charge_per_day;

          let completed = 0;

          passes.forEach((pass) => {

            const outDate = new Date(pass.out_date);
            const returnDate = new Date(pass.return_date);

            const days =
  Math.max(
    1,
    Math.ceil(
      (returnDate - outDate) /
      (1000 * 60 * 60 * 24)
    )
  );

            const deduction =
              days * chargeFromDatabase;

            // CHECK DUPLICATE
            db.query(
              "SELECT * FROM mess_deductions WHERE outing_record_id = ?",
              [pass.id],
              (checkErr, existing) => {

                if (checkErr) {
                  console.log(checkErr);

                  completed++;

                  if (completed === passes.length) {
                    return res.json({
                      message: "Calculation completed"
                    });
                  }

                  return;
                }

                // ALREADY EXISTS
                if (existing.length > 0) {

                  completed++;

                  if (completed === passes.length) {
                    return res.json({
                      message: "No new deductions to calculate"
                    });
                  }

                  return;
                }

                // INSERT NEW DEDUCTION
                db.query(
                  `
                  INSERT INTO mess_deductions
                  (
                    student_id,
                    outing_record_id,
                    month,
                    deduction_amount
                  )
                  VALUES (?, ?, ?, ?)
                  `,
                  [
                    pass.student_id,
                    pass.id,
                    new Date().toISOString().slice(0, 7),
                    deduction
                  ],
                  (insertErr) => {

                    if (insertErr) {
                      console.log(insertErr);
                    }

                    completed++;

                    if (completed === passes.length) {
                      return res.json({
                        message: "Mess deductions calculated"
                      });
                    }

                  }
                );

              }
            );

          });

        }
      );

    }
  );

});

// =====================================
// GET ALL DEDUCTIONS
// =====================================
router.get("/deductions", (req, res) => {

  db.query(
    "SELECT * FROM mess_deductions",
    (err, results) => {

      if (err) {
        console.log(err);
        return res.status(500).json(err);
      }

      res.json(results);

    }
  );

});

// =====================================
// MONTHLY AGGREGATION
// =====================================
router.get("/monthly-deductions", (req, res) => {

  db.query(
    `
    SELECT
      student_id,
      month,
      SUM(deduction_amount) AS total_deduction
    FROM mess_deductions
    GROUP BY student_id, month
    ORDER BY month DESC
    `,
    (err, results) => {

      if (err) {
        console.log(err);
        return res.status(500).json(err);
      }

      res.json(results);

    }
  );

});

module.exports = router;