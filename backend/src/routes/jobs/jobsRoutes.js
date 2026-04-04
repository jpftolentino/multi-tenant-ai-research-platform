const express = require("express");
const router = express.Router();
const { getJobs, createJob } = require("../../controllers/jobs/jobsController");
const authMiddleware = require("../../middleware/authMiddleware");

// router.get("/", getJobs);
router.post("/", authMiddleware, createJob);
router.get("/", authMiddleware, getJobs);

module.exports = router;