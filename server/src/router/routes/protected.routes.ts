import { Router } from "express";
import { logout, userVerify } from "../../controllers/auth.controller";

const protectedRoutes = Router();

protectedRoutes.get("/verify", userVerify);
protectedRoutes.get("/logout", logout);

export default protectedRoutes;
