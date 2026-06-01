import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface AuthRequest extends Request {
  admin?: {
    id: string;
    email: string;
  };
}

/**
 * Middleware to protect routes — verifies JWT from Authorization header.
 * Usage: router.post("/services", authenticateAdmin, controller.create)
 */
export function authenticateAdmin(req: AuthRequest, res: Response, next: NextFunction): void {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({
      error: "Access denied. No token provided.",
      code: "AUTH_NO_TOKEN"
    });
    return;
  }

  const token = authHeader.split(" ")[1];

  try {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      res.status(500).json({
        error: "Server configuration error.",
        code: "AUTH_NO_SECRET"
      });
      return;
    }

    const decoded = jwt.verify(token, secret) as { id: string; email: string };
    req.admin = decoded;
    next();
  } catch (error: any) {
    if (error.name === "TokenExpiredError") {
      res.status(401).json({
        error: "Token expired. Please login again.",
        code: "AUTH_TOKEN_EXPIRED"
      });
      return;
    }

    res.status(401).json({
      error: "Invalid token.",
      code: "AUTH_INVALID_TOKEN"
    });
  }
}
