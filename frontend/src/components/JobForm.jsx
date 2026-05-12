import { useState } from "react";
import { API_BASE_URL } from "../config";

function JobForm({ token, onJobCreated, onAuthError }) {

  const [input, setInput] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!input.trim()) return;
    
    try {
      const response = await fetch(`${API_BASE_URL}/jobs`,{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ 
          input 
        })

      });

      if (response.status === 401) {
        onAuthError();
        return;
      }

      if (!response.ok) {
        throw new Error("Job creation failed");
      }

      const data = await response.json();
      console.log(data);

      setInput("")
      onJobCreated();      
    } catch (error) {
      console.log("Job creation error:", error)
    } 
  };

  return (
    <div>
      <h2>Submit Job</h2>
      <form onSubmit={handleSubmit}>
        <textarea 
          placeholder="Paste research text here"
          value={input}
          onChange ={(e) => setInput(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default JobForm;