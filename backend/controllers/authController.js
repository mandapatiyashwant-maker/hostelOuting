const db = require("../config/db");

const registerUser = (req, res) => {
  const { name, email, password, role } = req.body;

  const sql = `
    INSERT INTO users
    (name, email, password, role)
    VALUES (?, ?, ?, ?)
  `;

  db.query(
    sql,
    [name, email, password, role],
    (err, result) => {
      if (err) {
        return res.status(500).json(err);
      }

      res.json({
        message: "User Registered Successfully",
      });
    }
  );
};

const loginUser = (req, res) => {
  const { email, password } = req.body;

  const sql =
    "SELECT * FROM users WHERE email = ? AND password = ?";

  db.query(
    sql,
    [email, password],
    (err, result) => {
      if (err) {
        return res.status(500).json(err);
      }

      if (result.length === 0) {
        return res.status(401).json({
          message: "Invalid Credentials",
        });
      }

      const user = result[0];

      res.json({
        message: "Login Successful",
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      });
    }
  );
};

module.exports = {
  registerUser,
  loginUser,
};