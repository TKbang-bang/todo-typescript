"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletingTodo = exports.updatingTodo = exports.gettingTodoById = exports.gettingTodos = exports.creatingTodo = void 0;
const pool_1 = __importDefault(require("../db/pool"));
const creatingTodo = async (todo, user_id) => {
    try {
        const result = await pool_1.default.query('INSERT INTO "Todo" ("content", "user_id") VALUES ($1, $2) RETURNING *', [todo, user_id]);
        return result.rows[0];
    }
    catch (error) {
        throw error;
    }
};
exports.creatingTodo = creatingTodo;
const gettingTodos = async (user_id) => {
    try {
        const result = await pool_1.default.query(`SELECT * FROM "Todo" WHERE "user_id" = $1 AND "status" = 'pending' ORDER BY "created_at" DESC`, [user_id]);
        return result.rows;
    }
    catch (error) {
        console.log(error);
        throw error;
    }
};
exports.gettingTodos = gettingTodos;
const gettingTodoById = async (todo_id) => {
    try {
        const result = await pool_1.default.query(`SELECT * FROM "Todo" WHERE "id" = $1`, [
            todo_id,
        ]);
        return result.rows[0] || null;
    }
    catch (error) {
        throw error;
    }
};
exports.gettingTodoById = gettingTodoById;
const updatingTodo = async (todo_id) => {
    try {
        await pool_1.default.query(`UPDATE "Todo" SET "status" = 'done' WHERE "id" = $1`, [
            todo_id,
        ]);
    }
    catch (error) {
        throw error;
    }
};
exports.updatingTodo = updatingTodo;
const deletingTodo = async (todo_id) => {
    try {
        await pool_1.default.query(`DELETE FROM "Todo" WHERE "id" = $1`, [todo_id]);
    }
    catch (error) {
        throw error;
    }
};
exports.deletingTodo = deletingTodo;
