const express = require("express");
const cors = require("cors");
const app = express();

const healthRoutes = require("./routes/healthRoutes");
const authRoutes = require("./routes/auth/authRoutes");
const jobsRoutes = require("./routes/jobs/jobsRoutes");

const allowedOrigins = (process.env.CORS_ORIGIN || "http://localhost:5173")
  .split(",")
  .map((origin) => origin.trim());

app.use(
  cors({
    origin: allowedOrigins,
  })
);

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