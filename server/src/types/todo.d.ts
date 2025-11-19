import { UserId } from "./user";

export interface Todo {
  id: number;
  content: string;
  status: "pending" | "done";
  user_id: UserId;
  created_at: string;
}
