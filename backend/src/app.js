const express = require("express");

const app = express();

// Middleware to let Express read JSON request bodies later
app.use(express.json());

// Basic health check route
app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

module.exports = app;