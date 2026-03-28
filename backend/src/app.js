const express = require("express");
const app = express();

const healthRoutes = require("./routes/healthRoutes");
const authRoutes = require("./routes/auth/authRoutes");
const jobsRoutes = require("./routes/jobs/jobsRoutes");

app.use(express.json());
app.use("/", healthRoutes);
app.use("/auth", authRoutes);
app.use("/jobs", jobsRoutes);

module.exports = app;