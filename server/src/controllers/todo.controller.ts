import { Request, Response } from "express";
import {
  creatingTodo,
  deletingTodo,
  gettingTodoById,
  gettingTodos,
  updatingTodo,
} from "../services/todo.service";

export const createTodo = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { todo } = req.body;
    if (typeof todo !== "string")
      return res.status(400).json({ message: "field todo should be a string" });

    const result = await creatingTodo(todo, req.userId!);

    return res.status(200).json({ todo: result });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getTodos = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const todos = await gettingTodos(req.userId!);

    return res.status(200).json({ todos });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const updateTodo = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { id } = req.params;
    const num = Number(id);
    if (Number.isNaN(num)) {
      return res.status(400).json({ message: "id should be a number" });
    }

    // getting todo by id
    const todo = await gettingTodoById(num);
    if (!todo) return res.status(404).json({ message: "Todo not found" });

    // check if the todo is owned by the user
    if (todo.user_id !== req.userId)
      return res.status(401).json({ message: "Unauthorized" });

    // updating todo
    await updatingTodo(num);

    return res.status(200).json({ message: "Todo updated" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteTodo = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { id } = req.params;
    const num = Number(id);
    if (Number.isNaN(num)) {
      return res.status(400).json({ message: "id should be a number" });
    }

    // getting todo by id
    const todo = await gettingTodoById(num);
    if (!todo) return res.status(404).json({ message: "Todo not found" });

    // check if the todo is owned by the user
    if (todo.user_id !== req.userId)
      return res.status(401).json({ message: "Unauthorized" });

    // updating todo
    await deletingTodo(num);

    return res.status(200).json({ message: "Todo deleted" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};
