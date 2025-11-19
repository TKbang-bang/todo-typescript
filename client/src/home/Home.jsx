import React from "react";
import Header from "./components/Header";
import "./home.css";
import Todos from "./components/Todos";

function Home() {
  return (
    <section className="home">
      <div className="container">
        <Header />
        <Todos />
      </div>
    </section>
  );
}

export default Home;
