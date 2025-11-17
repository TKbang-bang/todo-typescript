import { UserId } from "./user";

export interface CookieOptions {
  httpOnly: boolean;
  secure: boolean;
  sameSite: boolean | "lax" | "strict" | "none";
  maxAge: number;
}

export interface TokenPayload {
  id: UserId;
  iat: number;
  exp: number;
}
