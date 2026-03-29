const express = require("express");
const router = express.Router();

// const { getJobs } = require("../../controllers/jobs/jobsController")
const { getJobs, createJob } = require("../../controllers/jobs/jobsController")

console.log(createJob);

router.get("/", getJobs);
router.post("/", createJob)

module.exports = router;