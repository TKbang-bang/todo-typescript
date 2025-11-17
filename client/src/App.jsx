import React, { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Signup from "./auth/Signup";
import Login from "./auth/Login";
import axios from "axios";
import { logout, sessionCheck } from "./services/auth.service";

axios.defaults.baseURL = `${import.meta.env.VITE_SERVER_URL}`;
axios.defaults.withCredentials = true;

function App() {
  const navigate = useNavigate();

  const verifySession = async () => {
    try {
      const res = await sessionCheck();
      if (!res.ok) throw new Error(res.message);

      return;
    } catch (error) {
      if (window.location.pathname !== "/login") {
        navigate("/login");
        window.location.reload();
        return;
      }
    }
  };

  useEffect(() => {
    verifySession();
  }, []);

  const logingOut = async () => {
    try {
      const res = await logout();
      if (!res.ok) throw new Error(res.message);

      navigate("/login");
      window.location.reload();
      return;
    } catch (error) {
      return alert(error.message);
    }
  };

  return (
    <>
      <Routes>
        <Route path="/" element={<h1>Hola mundo</h1>} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <button onClick={logingOut}>click</button>
    </>
  );
}

export default App;
