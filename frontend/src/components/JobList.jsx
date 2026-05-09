import { useState, useEffect } from "react";

import JobCard from "./JobCard";

function JobList({ token, refreshJobs }) {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch("http://localhost:5000/jobs" ,{
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error("Get Job failed");
        }

        const data = await response.json();
        setJobs(data);  
      } catch (error) {
        console.log("Job list error:", error);
      }
    };
      
    fetchJobs();
  }, [token, refreshJobs]);


  return (
    <div>
      <h2>Your Jobs</h2>
      {jobs.length === 0 ? (
        <p>No jobs yet.</p>
      ) : (
        jobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))
      )}
    </div>
  );
}

export default JobList;