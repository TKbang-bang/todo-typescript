"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.gettingTodos = exports.creatingTodo = void 0;
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
        const result = await pool_1.default.query(`SELECT * FROM "Todo" WHERE "user_id" = $1`, [user_id]);
        return result.rows;
    }
    catch (error) {
        throw error;
    }
};
exports.gettingTodos = gettingTodos;
