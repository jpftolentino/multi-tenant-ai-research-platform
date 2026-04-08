const { Queue } = require("bullmq");
const connection = { host: "127.0.0.1", port: 6379 };

const jobQueue = new Queue("jobs", { connection });

module.exports = jobQueue;