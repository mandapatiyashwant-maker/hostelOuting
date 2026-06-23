const express = require("express");
const cors = require("cors");
require("dotenv").config();

const db = require("./config/db");
const authRoutes =
require("./routes/authRoutes");
const outingRoutes =
require("./routes/outingRoutes");
const statusRoutes = require("./routes/statusRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hostel Outing System API Running");
});
app.use(
    "/api",
    authRoutes
);
app.use(
    "/api/outing",
    outingRoutes
);
app.use("/api/status", statusRoutes);
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
