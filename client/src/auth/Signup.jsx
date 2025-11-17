import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./auth.css";
import { signup } from "../services/auth.service";

function Signup() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await signup(name, email, password);
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
        <h1>Sign Up</h1>

        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

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

        <button type="submit">Sign Up</button>

        <p>
          Already have an account? <Link to={"/login"}>Log In</Link>
        </p>
      </form>
    </section>
  );
}

export default Signup;
