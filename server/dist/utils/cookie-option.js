"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cookieOption = {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    maxAge: 1000 * 60 * 60 * 24 * 7,
};
exports.default = cookieOption;
