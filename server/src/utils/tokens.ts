import jwt from "jsonwebtoken";
import { UserId } from "../types/user";

export const createAccessToken = (id: UserId) => {
  return jwt.sign({ id }, process.env.ACCESS_TOKEN_SECRET!, {
    expiresIn: "15m",
  });
};

export const createRefreshToken = (id: UserId) => {
  return jwt.sign({ id }, process.env.REFRESH_TOKEN_SECRET!, {
    expiresIn: "7d",
  });
};
