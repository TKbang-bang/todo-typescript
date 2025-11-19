import React, { useContext, useEffect } from "react";
import { UserContext } from "../../App";
import { logout } from "../../services/auth.service";
import { useNavigate } from "react-router-dom";
import "./components.css";

function Header() {
  const user = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
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
    <header className="header">
      <h3>{user.name}</h3>
      <button onClick={handleLogout}>Log Out</button>
    </header>
  );
}

export default Header;
