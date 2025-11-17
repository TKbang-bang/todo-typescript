import { Response } from "express";
import cookieOption from "./cookie-option";

export const returnTokens = (
  res: Response,
  accessToken: string,
  refreshToken: string
) => {
  return res
    .cookie("refreshToken", refreshToken, cookieOption)
    .status(200)
    .json({
      accessToken,
      message: "Account created successfully",
    });
};
