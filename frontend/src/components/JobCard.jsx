function JobCard({ job }) {
  return (
    <div>
      <h3>{job.input}</h3>
      <p>JobId: {job.id} Status: {job.status}</p>
    </div>
  );
}

export default JobCard;