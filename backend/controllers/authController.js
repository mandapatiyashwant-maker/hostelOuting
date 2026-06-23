const db = require("../config/db");

const registerUser = (req, res) => {

    const { name, email, password, role } = req.body;

    const sql =
    `INSERT INTO users
    (name,email,password,role)
    VALUES (?,?,?,?)`;

    db.query(
        sql,
        [name,email,password,role],
        (err,result)=>{

            if(err){
                return res.status(500).json(err);
            }

            res.json({
                message:"User Registered Successfully"
            });

        }
    );
};

module.exports = {
    registerUser
};