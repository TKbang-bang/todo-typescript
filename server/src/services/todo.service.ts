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
      `SELECT * FROM "Todo" WHERE "user_id" = $1 AND "status" = 'pending' ORDER BY "created_at" DESC`,
      [user_id]
    );

    return result.rows;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const gettingTodoById = async (
  todo_id: number
): Promise<Todo | null> | never => {
  try {
    const result = await pool.query(`SELECT * FROM "Todo" WHERE "id" = $1`, [
      todo_id,
    ]);

    return result.rows[0] || null;
  } catch (error) {
    throw error;
  }
};

export const updatingTodo = async (todo_id: number): Promise<void> | never => {
  try {
    await pool.query(`UPDATE "Todo" SET "status" = 'done' WHERE "id" = $1`, [
      todo_id,
    ]);
  } catch (error) {
    throw error;
  }
};

export const deletingTodo = async (todo_id: number): Promise<void> | never => {
  try {
    await pool.query(`DELETE FROM "Todo" WHERE "id" = $1`, [todo_id]);
  } catch (error) {
    throw error;
  }
};
