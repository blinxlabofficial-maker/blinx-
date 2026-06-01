import express from "express";
import { authenticateAdmin } from "../middlewares/auth";
import { validate } from "../middlewares/validate";
import { loginSchema, changePasswordSchema } from "../validators/schemas";
import { login, getMe, changePassword } from "../controllers/authController";

const router = express.Router();

// POST /api/auth/login — Public
router.post("/login", validate(loginSchema), login);

// GET /api/auth/me — Protected
router.get("/me", authenticateAdmin, getMe);

// POST /api/auth/change-password — Protected
router.post("/change-password", authenticateAdmin, validate(changePasswordSchema), changePassword);

export default router;
