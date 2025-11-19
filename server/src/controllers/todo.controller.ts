import { Request, Response } from "express";
import { creatingTodo, gettingTodos } from "../services/todo.service";

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
