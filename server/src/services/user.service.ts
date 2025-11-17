import pool from "../db/pool";
import { User, UserId } from "../types/user";
import bcrypt from "bcrypt";

export const getUserByEmail = async (
  email: string
): Promise<User | null> | never => {
  try {
    const result = await pool.query(
      `SELECT * FROM "Users" WHERE "email" = $1`,
      [email]
    );

    return result.rows[0] || null;
  } catch (error) {
    throw error;
  }
};

export const getUserById = async (id: UserId): Promise<User | null> | never => {
  try {
    const result = await pool.query(`SELECT * FROM "Users" WHERE "id" = $1`, [
      id,
    ]);

    return result.rows[0] || null;
  } catch (error) {
    throw error;
  }
};

export const creatingUser = async (user: User): Promise<User> | never => {
  try {
    const { name, email, password } = user;

    const result = await pool.query(
      `INSERT INTO "Users" ("id", "name", "email", "password") VALUES ($1, $2, $3, $4) RETURNING *`,
      [crypto.randomUUID(), name, email, await bcrypt.hash(password, 10)]
    );

    return result.rows[0];
  } catch (error) {
    throw error;
  }
};
