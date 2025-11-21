import { Router } from "express";
import { logout, userVerify } from "../../controllers/auth.controller";
import {
  createTodo,
  deleteTodo,
  getTodos,
  updateTodo,
} from "../../controllers/todo.controller";

const protectedRoutes = Router();

// auth
protectedRoutes.get("/verify", userVerify);
protectedRoutes.get("/logout", logout);
// todo
protectedRoutes.post("/todo", createTodo);
protectedRoutes.get("/todo", getTodos);
protectedRoutes.put("/todo/:id", updateTodo);
protectedRoutes.delete("/todo/:id", deleteTodo);

export default protectedRoutes;
