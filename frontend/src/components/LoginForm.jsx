import { useState } from 'react';

function LoginForm({ setToken }) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {    
      const response = await fetch("http://localhost:5001/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ 
          email, password 
        })
      });
      
      if (!response.ok) {
        throw new Error("Login failed");
      }
      
      const data = await response.json();
      localStorage.setItem("token", data.token);
      setToken(data.token);


    } catch (error) {
      console.log("Login error:", error);
    } finally {
      
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      {loading && <p>Logging in...</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input 
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div> 
  );
}

export default LoginForm;