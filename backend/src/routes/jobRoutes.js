const express = require("express");
const router = express.Router();

const { getJobs } = require("../controllers/jobController")

router.get("/jobs", getJobs);

// router.get("/jobs", (req, res) => {
//     res.send("Get all jobs");
// });

router.post("/jobs", (req, res) => {
    res.send("Create jobs");
});


module.exports = router;