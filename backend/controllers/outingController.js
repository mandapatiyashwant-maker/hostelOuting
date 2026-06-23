const db = require("../config/db");

const applyOuting = (req, res) => {

    const {
        student_id,
        out_date,
        return_date,
        reason
    } = req.body;

    const sql = `
        INSERT INTO outing_requests
        (
            student_id,
            out_date,
            return_date,
            reason
        )
        VALUES (?, ?, ?, ?)
    `;

    db.query(
        sql,
        [student_id, out_date, return_date, reason],
        (err, result) => {

            if (err) {
                return res.status(500).json(err);
            }

            res.json({
                message: "Outing Request Submitted Successfully"
            });
        }
    );
};

module.exports = {
    applyOuting
};