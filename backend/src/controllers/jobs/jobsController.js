exports.getJobs = (req, res) => {
    res.json({ message: "Fetching jobs" });
};

exports.createJobs = (req, res) => {
    res.json({ message: "Creating jobs"});
};
