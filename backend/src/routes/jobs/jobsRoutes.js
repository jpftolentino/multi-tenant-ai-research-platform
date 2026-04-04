const express = require("express");
const router = express.Router();
const { createJob, getJobs, getJobById } = require("../../controllers/jobs/jobsController");
const authMiddleware = require("../../middleware/authMiddleware");

router.use(authMiddleware);
router.post("/", createJob);
router.get("/", getJobs);
router.get("/:id", getJobById);

module.exports = router;