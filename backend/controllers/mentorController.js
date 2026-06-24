const db = require("../config/db");

const getRequests = (req, res) => {
  db.query(
    "SELECT * FROM outing_requests WHERE mentor_status='Pending'",
    (err, results) => {
      if (err) return res.status(500).json(err);
      res.json(results);
    }
  );
};

const approveRequest = (req, res) => {
  const { id } = req.params;

  db.query(
    "UPDATE outing_requests SET mentor_status='Approved' WHERE id=?",
    [id],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Request Approved" });
    }
  );
};

module.exports = { getRequests, approveRequest };