const express = require("express");
const router = express.Router();

const { getJobs } = require("../../controllers/jobs/jobsController")
const { createJobs } = require("../../controllers/jobs/jobsController")

router.get("/", getJobs);
router.post("/", createJobs)

module.exports = router;