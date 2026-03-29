const pool = require("../../config/db");

const createJob = async (req, res) => {
    const { input } = req.body;

    const result = await pool.query(
        "INSERT INTO jobs (user_id, input) VALUES ($1, $2) RETURNING *",
        [1, input]
    );

    res.json(result.rows[0])
};

const getJobs = async (req, res) => {
    const result = await pool.query(
        "SELECT * FROM jobs WHERE user_id = $1 ORDER BY created_at DESC",
        [1]
    );

    res.json(result.rows);
}


module.exports = { 
    createJob,
    getJobs
};
