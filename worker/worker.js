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


        try {
            const { rows }  = await pool.query(
                "SELECT * FROM jobs WHERE id = $1",
                [jobId]
            );

            if (rows.length === 0) {
                throw new Error("Could not find job");
            }

            const jobInput = rows[0].input;

            const response = await fetch("http://localhost:11434/api/generate", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
                body: JSON.stringify({
                    model: "llama3",
                    prompt: `Summarize the following research text:\n\n${jobInput}`,
                    stream: false,
                }),
            });

            if (!response.ok) {
                throw new Error(`Ollama request failed with status ${response.status}`);
            }            

            const data = await response.json();

            await pool.query(
                "UPDATE jobs SET result = $1 WHERE id = $2",
                [data.response, jobId]
            );
            

            await pool.query(
                "UPDATE jobs SET status = $1 WHERE id = $2",
                ["completed", jobId]
            );

            console.log(`Job ${jobId} completed`);       

        } catch (error) {
            await pool.query(
                "UPDATE jobs SET status = $1 WHERE id = $2",
                ["failed", jobId]
            );
            console.log(error);
        }

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