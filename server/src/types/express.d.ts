import { UserId } from "./user"; // ajusta la ruta según tu proyecto

declare global {
  namespace Express {
    interface Request {
      userId?: UserId | null;
    }
  }
}
