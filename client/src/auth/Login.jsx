import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./auth.css";
import { login } from "../services/auth.service";
import { getAccessToken } from "../services/token.service";

function Login() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await login(email, password);
      if (!res.ok) throw new Error(res.message);

      navigate("/");
      return;
    } catch (error) {
      return alert(error.message);
    }
  };

  return (
    <section className="auth">
      <form onSubmit={handleSubmit}>
        <h1>Log In</h1>

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

        <button type="submit">Log In</button>

        <p>
          Don't have an account? <Link to={"/signup"}>Sign Up</Link>
        </p>
      </form>
    </section>
  );
}

export default Login;
