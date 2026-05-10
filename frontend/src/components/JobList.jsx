import { useState, useEffect } from "react";

import JobCard from "./JobCard";

function JobList({ token, refreshJobs }) {
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchJobs = async () => {
      setIsLoading(true);
      setError("");

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
        setError("Could not load jobs.");
      } finally {
        setIsLoading(false);
      }
    };
      
    fetchJobs();
  }, [token, refreshJobs]);


  return (
    <div>
      <h2>Your Jobs</h2>

      {isLoading && <p>Loading jobs...</p>}

      {error && <p>{error}</p>}

      {!isLoading && !error && jobs.length === 0 && (
        <p>No jobs yet.</p>
      )}

      {!isLoading && !error && jobs.length > 0 && (
        jobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))
      )}
    </div>
  );
}

export default JobList;