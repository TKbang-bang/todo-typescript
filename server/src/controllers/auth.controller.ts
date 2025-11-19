import { Response, Request } from "express";
import {
  creatingUser,
  getUserByEmail,
  getUserById,
} from "../services/user.service";
import { returnTokens } from "../utils/response-token";
import { createAccessToken, createRefreshToken } from "../utils/tokens";
import bcrypt from "bcrypt";
import { User } from "../types/user";

export const signup = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    // credentials from the client
    const { name, email, password } = req.body;
    // typing the client credentials
    if (
      typeof name != "string" ||
      typeof email != "string" ||
      typeof password != "string"
    )
      return res
        .status(400)
        .json({ message: "All the field should be string (text) type" });

    // check if the email is already signed
    const user = await getUserByEmail(email);
    if (user) return res.status(409).json({ message: "Email already in use" });

    // creating the user
    const createdUser = await creatingUser({ name, email, password });

    // creating the token
    const accessToken = createAccessToken(createdUser.id!);
    const refreshToken = createRefreshToken(createdUser.id!);

    // sending the tokens
    return returnTokens(res, accessToken, refreshToken);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const login = async (req: Request, res: Response): Promise<Response> => {
  try {
    // credentials from the client
    const { email, password } = req.body;
    // typing the client credentials
    if (typeof email != "string" || typeof password != "string")
      return res
        .status(400)
        .json({ message: "All the field should be string (text) type" });

    // check if the email is already signed
    const user = await getUserByEmail(email);
    if (!user) return res.status(404).json({ message: "User not found" });

    // check if the password is correct
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect)
      return res.status(401).json({ message: "Wrong password" });

    // creating the token
    const accessToken = createAccessToken(user.id!);
    const refreshToken = createRefreshToken(user.id!);

    // sending the tokens
    return returnTokens(res, accessToken, refreshToken);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const userVerify = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const user = (await getUserById(req.userId!)) as User;
    if (!user) return res.status(404).json({ message: "User not found" });

    return res.status(200).json({ message: "Be a good user", user });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const logout = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    req.userId = null;

    // clearing cookies
    res.clearCookie("refreshToken", {
      httpOnly: true,
      sameSite: "lax",
      secure: false,
    });

    return res.status(204).end();
  } catch (error) {
    return res.status(500).json({ message: "Internal sevrer error" });
  }
};
