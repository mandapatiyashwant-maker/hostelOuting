const db = require("../config/db");

const getPass = (req, res) => {
  db.query(
    "SELECT * FROM outing_requests WHERE final_status='Approved'",
    (err, results) => {
      if (err) return res.status(500).json(err);

      res.json(results);
    }
  );
};

module.exports = { getPass };