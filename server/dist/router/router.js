"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const protected_routes_1 = __importDefault(require("./routes/protected.routes"));
const session_1 = __importDefault(require("../middlewares/session"));
const router = (0, express_1.Router)();
router.use("/auth", auth_routes_1.default);
router.use("/protected", session_1.default, protected_routes_1.default);
exports.default = router;
