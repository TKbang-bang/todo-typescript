import React, { createContext, useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Signup from "./auth/Signup";
import Login from "./auth/Login";
import axios from "axios";
import { sessionCheck } from "./services/auth.service";
import Home from "./home/Home";

axios.defaults.baseURL = `${import.meta.env.VITE_SERVER_URL}`;
axios.defaults.withCredentials = true;

export const UserContext = createContext(null);

function App() {
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  const verifySession = async () => {
    try {
      const res = await sessionCheck();
      if (!res.ok) throw new Error(res.message);

      setUser(res.user);
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

  return (
    <UserContext.Provider value={user}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </UserContext.Provider>
  );
}

export default App;
