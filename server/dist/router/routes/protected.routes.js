"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("../../controllers/auth.controller");
const protectedRoutes = (0, express_1.Router)();
protectedRoutes.get("/verify", auth_controller_1.userVerify);
protectedRoutes.get("/logout", auth_controller_1.logout);
exports.default = protectedRoutes;
