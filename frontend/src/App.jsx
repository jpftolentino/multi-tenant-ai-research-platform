import { useState } from "react";
import LoginForm from "./components/LoginForm";
import JobForm from "./components/JobForm";
import JobList from "./components/JobList";
import './App.css'

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [refreshJobs, setRefreshJobs] = useState(false);
  

  return (
    <main>
      <h1>AI Research Platform</h1>

      {token ? (
        <>
          <JobForm 
            token={token}
            onJobCreated={() => setRefreshJobs((prev) => !prev)}
          />
          <JobList token={token} refreshJobs={refreshJobs}/>
        </>
      ) : (
        <LoginForm setToken={setToken} />
      )}
      
    </main>
  );
}

export default App;
