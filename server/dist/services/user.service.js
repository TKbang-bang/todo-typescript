"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.creatingUser = exports.getUserById = exports.getUserByEmail = void 0;
const pool_1 = __importDefault(require("../db/pool"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const getUserByEmail = async (email) => {
    try {
        const result = await pool_1.default.query(`SELECT * FROM "Users" WHERE "email" = $1`, [email]);
        return result.rows[0] || null;
    }
    catch (error) {
        throw error;
    }
};
exports.getUserByEmail = getUserByEmail;
const getUserById = async (id) => {
    try {
        const result = await pool_1.default.query(`SELECT * FROM "Users" WHERE "id" = $1`, [
            id,
        ]);
        return result.rows[0] || null;
    }
    catch (error) {
        throw error;
    }
};
exports.getUserById = getUserById;
const creatingUser = async (user) => {
    try {
        const { name, email, password } = user;
        const result = await pool_1.default.query(`INSERT INTO "Users" ("id", "name", "email", "password") VALUES ($1, $2, $3, $4) RETURNING *`, [crypto.randomUUID(), name, email, await bcrypt_1.default.hash(password, 10)]);
        return result.rows[0];
    }
    catch (error) {
        throw error;
    }
};
exports.creatingUser = creatingUser;
