"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const tokens_1 = require("../utils/tokens");
const cookie_option_1 = __importDefault(require("../utils/cookie-option"));
const sessionMiddleware = async (req, res, next) => {
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
            const payload = jsonwebtoken_1.default.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
            // set the user id in the request
            req.userId = payload.id;
            return next();
        }
        catch (error) { }
    }
    // --- REFRESH TOKEN ---
    if (refreshToken) {
        try {
            // verifiying if the refresh token is valid
            const payload = jsonwebtoken_1.default.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
            // creating new tokens
            const newAccessToken = (0, tokens_1.createAccessToken)(payload.id);
            const newRefreshToken = (0, tokens_1.createRefreshToken)(payload.id);
            // sending new tokens
            res.cookie("refreshToken", newRefreshToken, cookie_option_1.default);
            res.setHeader("access-token", `Bearer ${newAccessToken}`);
            // set the user id in the request
            req.userId = payload.id;
            return next();
        }
        catch {
            return res.status(401).json({ message: "Invalid refresh token" });
        }
    }
};
exports.default = sessionMiddleware;
