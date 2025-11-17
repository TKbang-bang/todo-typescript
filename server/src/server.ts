import express from "express";
import "dotenv/config";
import router from "./router/router";
import cors from "cors";
import cookieParser from "cookie-parser";

// creating express application
const app = express();

// setters
app.set("port", process.env.PORT || 3000);

// middlewares
app.use(express.json());
app.use(
  cors({
    origin: `${process.env.CLIENT_URL}`,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    exposedHeaders: ["access-token"],
  })
);
app.use(cookieParser());

// routes
app.use(router);

// starting server
app.listen(app.get("port"), () =>
  console.log(`Server on port ${app.get("port")}`)
);
