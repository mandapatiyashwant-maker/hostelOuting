const express = require("express");
const cors = require("cors");
require("dotenv").config();

const db = require("./config/db");
const authRoutes =
require("./routes/authRoutes");
const outingRoutes =
require("./routes/outingRoutes");
const statusRoutes = require("./routes/statusRoutes");
const mentorRoutes = require("./routes/mentorRoutes");
const wardenRoutes = require("./routes/wardenRoutes");
const passRoutes = require("./routes/passRoutes");
const adminRoutes = require("./routes/adminRoutes");
const settingsRoutes = require("./routes/settingsRoutes");

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
app.use("/api/mentor", mentorRoutes);
app.use("/api/warden", wardenRoutes);
app.use("/api/pass", passRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/settings", settingsRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
