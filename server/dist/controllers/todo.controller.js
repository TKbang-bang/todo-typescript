"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTodos = exports.createTodo = void 0;
const todo_service_1 = require("../services/todo.service");
const createTodo = async (req, res) => {
    try {
        const { todo } = req.body;
        if (typeof todo !== "string")
            return res.status(400).json({ message: "field todo should be a string" });
        const result = await (0, todo_service_1.creatingTodo)(todo, req.userId);
        return res.status(200).json({ todo: result });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};
exports.createTodo = createTodo;
const getTodos = async (req, res) => {
    try {
        const todos = await (0, todo_service_1.gettingTodos)(req.userId);
        return res.status(200).json({ todos });
    }
    catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
};
exports.getTodos = getTodos;
