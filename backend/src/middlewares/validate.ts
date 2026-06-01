import { Request, Response, NextFunction } from "express";
import { ZodSchema, ZodError } from "zod";

/**
 * Generic Zod validation middleware factory.
 * Validates req.body against the provided schema.
 *
 * Usage: router.post("/services", validate(createServiceSchema), controller.create)
 */
export function validate(schema: ZodSchema) {
  return (req: Request, res: Response, next: NextFunction): void => {
    try {
      req.body = schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const formattedErrors = error.errors.map(err => ({
          field: err.path.join("."),
          message: err.message
        }));

        res.status(400).json({
          error: "Validation failed",
          code: "VALIDATION_ERROR",
          details: formattedErrors
        });
        return;
      }

      next(error);
    }
  };
}

/**
 * Validates req.params against the provided schema.
 */
export function validateParams(schema: ZodSchema) {
  return (req: Request, res: Response, next: NextFunction): void => {
    try {
      req.params = schema.parse(req.params) as any;
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const formattedErrors = error.errors.map(err => ({
          field: err.path.join("."),
          message: err.message
        }));

        res.status(400).json({
          error: "Invalid parameters",
          code: "PARAM_VALIDATION_ERROR",
          details: formattedErrors
        });
        return;
      }

      next(error);
    }
  };
}
