function getStatusMessage(status) {
  if (status === "pending") return "Waiting to be processed.";
  if (status === "running") return "Processing your job...";
  if (status === "completed") return "Completed";
  if (status === "failed") return "This job failed.";

  return "Unknown status";
}

function JobCard({ job }) {
  return (
    <div>
      <h3>{job.input}</h3>
      <p>Job ID: {job.id}</p>

      <p>{getStatusMessage(job.status)}</p>

      {job.status === "completed" && <p>{job.result}</p>}
    </div>
  );
}

export default JobCard;