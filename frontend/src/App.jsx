import { useState } from "react";
import LoginForm from "./components/LoginForm";
import JobForm from "./components/JobForm";
import JobList from "./components/JobList";
import './App.css'

function App() {
  const [token, setToken] = useState(() => {
    return localStorage.getItem("token") || "";
  });
  const [refreshJobs, setRefreshJobs] = useState(false);
  
  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  function handleJobCreated() {
    setRefreshJobs((prev) => !prev);
  }

  return (
    <main>
      <h1>AI Research Platform</h1>
      {!token ? (
        <LoginForm setToken={setToken} />
      ) : (
        <>
          <JobForm token={token} onJobCreated={handleJobCreated} onAuthError={logout}/>
          <JobList token={token} refreshJobs={refreshJobs} onAuthError={logout}/>
        </>
      )}
    </main>
  );
}

export default App;
