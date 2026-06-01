import express from "express";
import { authenticateAdmin } from "../middlewares/auth";
import { uploadSingle, uploadMultiple } from "../controllers/uploadController";

const router = express.Router();

// POST /api/upload — Single file (Protected)
router.post("/", authenticateAdmin, uploadSingle);

// POST /api/upload/multiple — Multiple files (Protected)
router.post("/multiple", authenticateAdmin, uploadMultiple);

export default router;
