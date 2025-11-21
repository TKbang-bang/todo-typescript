"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTodo = exports.updateTodo = exports.getTodos = exports.createTodo = void 0;
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
const updateTodo = async (req, res) => {
    try {
        const { id } = req.params;
        const num = Number(id);
        if (Number.isNaN(num)) {
            return res.status(400).json({ message: "id should be a number" });
        }
        // getting todo by id
        const todo = await (0, todo_service_1.gettingTodoById)(num);
        if (!todo)
            return res.status(404).json({ message: "Todo not found" });
        // check if the todo is owned by the user
        if (todo.user_id !== req.userId)
            return res.status(401).json({ message: "Unauthorized" });
        // updating todo
        await (0, todo_service_1.updatingTodo)(num);
        return res.status(200).json({ message: "Todo updated" });
    }
    catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
};
exports.updateTodo = updateTodo;
const deleteTodo = async (req, res) => {
    try {
        const { id } = req.params;
        const num = Number(id);
        if (Number.isNaN(num)) {
            return res.status(400).json({ message: "id should be a number" });
        }
        // getting todo by id
        const todo = await (0, todo_service_1.gettingTodoById)(num);
        if (!todo)
            return res.status(404).json({ message: "Todo not found" });
        // check if the todo is owned by the user
        if (todo.user_id !== req.userId)
            return res.status(401).json({ message: "Unauthorized" });
        // updating todo
        await (0, todo_service_1.deletingTodo)(num);
        return res.status(200).json({ message: "Todo deleted" });
    }
    catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
};
exports.deleteTodo = deleteTodo;
