"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.returnTokens = void 0;
const cookie_option_1 = __importDefault(require("./cookie-option"));
const returnTokens = (res, accessToken, refreshToken) => {
    return res
        .cookie("refreshToken", refreshToken, cookie_option_1.default)
        .status(200)
        .json({
        accessToken,
        message: "Account created successfully",
    });
};
exports.returnTokens = returnTokens;
