import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { Admin } from "../models/admin";
import { AuthRequest } from "../middlewares/auth";

/**
 * POST /api/auth/login
 * Authenticate admin and return JWT token.
 */
export async function login(req: Request, res: Response): Promise<void> {
  try {
    const { email, password } = req.body;

    // Find admin by email
    const admin = await Admin.findOne({ email: email.toLowerCase() });
    if (!admin) {
      res.status(401).json({
        error: "Invalid credentials.",
        code: "AUTH_INVALID_CREDENTIALS"
      });
      return;
    }

    // Verify password
    const isMatch = await admin.comparePassword(password);
    if (!isMatch) {
      res.status(401).json({
        error: "Invalid credentials.",
        code: "AUTH_INVALID_CREDENTIALS"
      });
      return;
    }

    // Generate JWT
    const token = jwt.sign(
      { id: admin._id, email: admin.email },
      process.env.JWT_SECRET as string,
      { expiresIn: (process.env.JWT_EXPIRES_IN || "7d") as any }
    );

    res.json({
      message: "Authentication successful.",
      token,
      admin: {
        id: admin._id,
        email: admin.email
      }
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}

/**
 * GET /api/auth/me
 * Get current admin profile. (Protected)
 */
export async function getMe(req: AuthRequest, res: Response): Promise<void> {
  try {
    const admin = await Admin.findById(req.admin?.id).select("-password");
    if (!admin) {
      res.status(404).json({ error: "Admin not found." });
      return;
    }

    res.json({
      id: admin._id,
      email: admin.email,
      createdAt: admin.createdAt
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}

/**
 * POST /api/auth/change-password
 * Change admin password. (Protected)
 */
export async function changePassword(req: AuthRequest, res: Response): Promise<void> {
  try {
    const { currentPassword, newPassword } = req.body;

    const admin = await Admin.findById(req.admin?.id);
    if (!admin) {
      res.status(404).json({ error: "Admin not found." });
      return;
    }

    // Verify current password
    const isMatch = await admin.comparePassword(currentPassword);
    if (!isMatch) {
      res.status(401).json({
        error: "Current password is incorrect.",
        code: "AUTH_WRONG_PASSWORD"
      });
      return;
    }

    // Update password (pre-save hook will hash it)
    admin.password = newPassword;
    await admin.save();

    res.json({ message: "Password changed successfully." });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}
