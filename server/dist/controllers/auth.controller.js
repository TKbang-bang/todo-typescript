"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.userVerify = exports.login = exports.signup = void 0;
const user_service_1 = require("../services/user.service");
const response_token_1 = require("../utils/response-token");
const tokens_1 = require("../utils/tokens");
const bcrypt_1 = __importDefault(require("bcrypt"));
const signup = async (req, res) => {
    try {
        // credentials from the client
        const { name, email, password } = req.body;
        // typing the client credentials
        if (typeof name != "string" ||
            typeof email != "string" ||
            typeof password != "string")
            return res
                .status(400)
                .json({ message: "All the field should be string (text) type" });
        // check if the email is already signed
        const user = await (0, user_service_1.getUserByEmail)(email);
        if (user)
            return res.status(409).json({ message: "Email already in use" });
        // creating the user
        const createdUser = await (0, user_service_1.creatingUser)({ name, email, password });
        // creating the token
        const accessToken = (0, tokens_1.createAccessToken)(createdUser.id);
        const refreshToken = (0, tokens_1.createRefreshToken)(createdUser.id);
        // sending the tokens
        return (0, response_token_1.returnTokens)(res, accessToken, refreshToken);
    }
    catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
};
exports.signup = signup;
const login = async (req, res) => {
    try {
        // credentials from the client
        const { email, password } = req.body;
        // typing the client credentials
        if (typeof email != "string" || typeof password != "string")
            return res
                .status(400)
                .json({ message: "All the field should be string (text) type" });
        // check if the email is already signed
        const user = await (0, user_service_1.getUserByEmail)(email);
        if (!user)
            return res.status(404).json({ message: "User not found" });
        // check if the password is correct
        const isPasswordCorrect = await bcrypt_1.default.compare(password, user.password);
        if (!isPasswordCorrect)
            return res.status(401).json({ message: "Wrong password" });
        // creating the token
        const accessToken = (0, tokens_1.createAccessToken)(user.id);
        const refreshToken = (0, tokens_1.createRefreshToken)(user.id);
        // sending the tokens
        return (0, response_token_1.returnTokens)(res, accessToken, refreshToken);
    }
    catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
};
exports.login = login;
const userVerify = async (req, res) => {
    try {
        const user = (await (0, user_service_1.getUserById)(req.userId));
        if (!user)
            return res.status(404).json({ message: "User not found" });
        return res.status(200).json({ message: "Be a good user", user });
    }
    catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
};
exports.userVerify = userVerify;
const logout = async (req, res) => {
    try {
        req.userId = null;
        // clearing cookies
        res.clearCookie("refreshToken", {
            httpOnly: true,
            sameSite: "lax",
            secure: false,
        });
        return res.status(204).end();
    }
    catch (error) {
        return res.status(500).json({ message: "Internal sevrer error" });
    }
};
exports.logout = logout;
