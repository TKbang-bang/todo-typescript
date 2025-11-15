import express from "express";
import "dotenv/config";
import router from "./router/router";

// creating express application
const app = express();

// setters
app.set("port", process.env.PORT || 3000);

// middlewares
app.use(express.json());

// routes
app.use(router);

// starting server
app.listen(app.get("port"), () =>
  console.log(`Server on port ${app.get("port")}`)
);
