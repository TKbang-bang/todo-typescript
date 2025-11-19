"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("../../controllers/auth.controller");
const todo_controller_1 = require("../../controllers/todo.controller");
const protectedRoutes = (0, express_1.Router)();
// auth
protectedRoutes.get("/verify", auth_controller_1.userVerify);
protectedRoutes.get("/logout", auth_controller_1.logout);
// todo
protectedRoutes.post("/todo", todo_controller_1.createTodo);
protectedRoutes.get("/todo", todo_controller_1.getTodos);
exports.default = protectedRoutes;
