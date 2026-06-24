const db = require("../config/db");

const getRequests = (req, res) => {
  db.query(
    "SELECT * FROM outing_requests WHERE mentor_status='Approved' AND warden_status='Pending'",
    (err, results) => {
      if (err) return res.status(500).json(err);
      res.json(results);
    }
  );
};

const approveRequest = (req, res) => {
  const { id } = req.params;

  db.query(
    "SELECT * FROM outing_passes WHERE outing_request_id=?",
    [id],
    (err, existing) => {
      if (err) {
        return res.status(500).json(err);
      }

      if (existing.length > 0) {
        return res.json({
          message: "Pass already generated"
        });
      }

      db.query(
        `UPDATE outing_requests
         SET warden_status='Approved',
             final_status='Approved'
         WHERE id=?`,
        [id],
        (err) => {
          if (err) {
            return res.status(500).json(err);
          }

          const passNumber =
            "PASS-" +
            new Date().getFullYear() +
            "-" +
            String(id).padStart(3, "0");

          db.query(
            `INSERT INTO outing_passes
            (outing_request_id, pass_number)
            VALUES (?, ?)`,
            [id, passNumber],
            (passErr) => {
              if (passErr) {
                return res.status(500).json(passErr);
              }

              res.json({
                message: "Request Approved & Pass Generated",
                passNumber
              });
            }
          );
        }
      );
    }
  );
};

module.exports = {
  getRequests,
  approveRequest,
};