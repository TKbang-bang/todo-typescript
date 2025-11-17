import { Router } from "express";
import authRoutes from "./routes/auth.routes";
import protectedRoutes from "./routes/protected.routes";
import sessionMiddleware from "../middlewares/session";

const router = Router();

router.use("/auth", authRoutes);
router.use("/protected", sessionMiddleware, protectedRoutes);

export default router;
