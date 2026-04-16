import { useState } from 'react'
import LoginForm from "./components/LoginForm";
import JobForm from "./components/JobForm";
import JobList from "./components/JobList";
import './App.css'

function App() {
  return (
    <div>
      <h1>AI Research Platform</h1>
      <LoginForm />
      <JobForm />
      <JobList />
    </div>
  );
}

export default App;
