const express = require("express");
const app = express();

const healthRoutes = require("./routes/healthRoutes");
const authRoutes = require("./routes/authRoutes");
const jobRoutes = require("./routes/jobRoutes");

app.use(express.json());
app.use("/", healthRoutes);
app.use("/auth", authRoutes);
app.use("/", jobRoutes);

module.exports = app;