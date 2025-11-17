import { Response, Request, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { createAccessToken, createRefreshToken } from "../utils/tokens";
import cookieOption from "../utils/cookie-option";
import { TokenPayload } from "../types/cookie";

const sessionMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // tokens from the client
  const accessToken = req.headers.authorization?.split(" ")[1];
  const refreshToken = req.cookies.refreshToken;

  if (!accessToken || accessToken === "null") {
    if (!refreshToken) {
      return res.status(401).json({ message: "Unauthorized" });
    }
  }

  // --- ACCESS TOKEN ---
  if (accessToken && accessToken !== "null") {
    try {
      // verifiying if the access token is valid
      const payload = jwt.verify(
        accessToken,
        process.env.ACCESS_TOKEN_SECRET!
      ) as TokenPayload;

      // set the user id in the request
      req.userId = payload.id;
      return next();
    } catch (error) {}
  }

  // --- REFRESH TOKEN ---
  if (refreshToken) {
    try {
      // verifiying if the refresh token is valid
      const payload = jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET!
      ) as TokenPayload;

      // creating new tokens
      const newAccessToken = createAccessToken(payload.id);
      const newRefreshToken = createRefreshToken(payload.id);

      // sending new tokens
      res.cookie("refreshToken", newRefreshToken, cookieOption);
      res.setHeader("access-token", `Bearer ${newAccessToken}`);

      // set the user id in the request
      req.userId = payload.id;
      return next();
    } catch {
      return res.status(401).json({ message: "Invalid refresh token" });
    }
  }
};

export default sessionMiddleware;
