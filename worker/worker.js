const { Worker } = require("bullmq");
const pool = require("../backend/src/config/db");

const connection = {
    host: "127.0.0.1",
    port: 6379,
};

const worker = new Worker(
    "jobs",
    async (job) => {
        const { jobId } = job.data;

        await pool.query(
            "UPDATE jobs SET status = $1 WHERE id = $2",
            ["running", jobId]
        );

        console.log(`Job ${job.data.jobId} is running`);

        await new Promise((resolve) => setTimeout(resolve, 3000)); // simulate work with a delay


        await pool.query(
            "UPDATE jobs SET status = $1 WHERE id = $2",
            ["completed", jobId]
        );

        console.log(`Job ${job.data.jobId} completed`);

    },
    { connection }
);


// Optional: Listen to worker events for logging
// worker.on("running", (job) => {
//     console.log(`Job ${job.id} is running`);
// });

// worker.on("completed", (job) => {
//     console.log(`Job ${job.id} completed`);
// });

// worker.on("failed", (job, err) => {
//     console.log(`Job ${job.id} failed:`, err.message);
// });