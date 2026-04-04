const pool = require("../../config/db");

const createJob = async (req, res) => {
    try {
        const { input } = req.body;
        const userId = req.user.userId;

        if (!input || !input.trim()) {
            return res.status(400).json({
                message: "Input is required"
            });
        }

        const result = await pool.query(
            "INSERT INTO jobs (user_id, input, status) VALUES ($1, $2, $3) RETURNING *",
            [userId, input, "pending"]
        );

        return res.status(201).json(result.rows[0]);
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
};

const getJobs = async (req, res) => {
    try {
        const userId = req.user.userId;

        const result = await pool.query(
            "SELECT * FROM jobs WHERE user_id = $1 ORDER BY created_at DESC",
            [userId]
        );

        return res.status(200).json(result.rows);
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
};


module.exports = { 
    createJob,
    getJobs
};
