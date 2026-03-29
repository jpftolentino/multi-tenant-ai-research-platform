const express = require("express");
const app = express();

const healthRoutes = require("./routes/healthRoutes");
const authRoutes = require("./routes/auth/authRoutes");
const jobsRoutes = require("./routes/jobs/jobsRoutes");

app.use(express.json());
app.use("/", healthRoutes);
app.use("/auth", authRoutes);
app.use("/jobs", jobsRoutes);

//Test Coonection Route
const pool = require("./config/db");

app.get("/test-db", async (req,res) => {
    const result = await pool.query("SELECT * FROM users");
    res.json(result.rows);
});

module.exports = app;