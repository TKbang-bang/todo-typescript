import pool from "../db/pool";
import { Todo } from "../types/todo";
import { UserId } from "../types/user";

export const creatingTodo = async (
  todo: string,
  user_id: UserId
): Promise<Todo> | never => {
  try {
    const result = await pool.query(
      'INSERT INTO "Todo" ("content", "user_id") VALUES ($1, $2) RETURNING *',
      [todo, user_id]
    );

    return result.rows[0];
  } catch (error) {
    throw error;
  }
};

export const gettingTodos = async (
  user_id: UserId
): Promise<Todo[]> | never => {
  try {
    const result = await pool.query(
      `SELECT * FROM "Todo" WHERE "user_id" = $1`,
      [user_id]
    );

    return result.rows;
  } catch (error) {
    throw error;
  }
};
