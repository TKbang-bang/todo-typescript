"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("dotenv/config");
const router_1 = __importDefault(require("./router/router"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
// creating express application
const app = (0, express_1.default)();
// setters
app.set("port", process.env.PORT || 3000);
// middlewares
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: `${process.env.CLIENT_URL}`,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    exposedHeaders: ["access-token"],
}));
app.use((0, cookie_parser_1.default)());
// routes
app.use(router_1.default);
// starting server
app.listen(app.get("port"), () => console.log(`Server on port ${app.get("port")}`));
