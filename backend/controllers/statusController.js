const db = require("../config/db");

const getStatus = (req, res) => {
  db.query(
    "SELECT * FROM outing_requests WHERE student_id = ?",
    [1],
    (err, rows) => {
      if (err) {
        console.error(err);
        return res.status(500).json(err);
      }

      res.json(rows);
    }
  );
};

module.exports = { getStatus };