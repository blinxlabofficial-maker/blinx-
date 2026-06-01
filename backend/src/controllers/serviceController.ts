import { Request, Response } from "express";
import { dbService } from "../services/local_db";

/**
 * GET /api/services — Public
 */
export async function getAll(req: Request, res: Response): Promise<void> {
  try {
    const services = await dbService.getServices();
    res.json(services);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}

/**
 * GET /api/services/:id — Public
 */
export async function getById(req: Request, res: Response): Promise<void> {
  try {
    const services = await dbService.getServices();
    const service = services.find((s: any) => s.id === req.params.id);
    if (!service) {
      res.status(404).json({ error: "Service not found" });
      return;
    }
    res.json(service);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}

/**
 * POST /api/services — Protected
 */
export async function create(req: Request, res: Response): Promise<void> {
  try {
    const saved = await dbService.createService(req.body);
    res.status(201).json(saved);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
}

/**
 * PUT /api/services/:id — Protected
 */
export async function update(req: Request, res: Response): Promise<void> {
  try {
    const updated = await dbService.updateService(req.params.id as string, req.body);
    if (!updated) {
      res.status(404).json({ error: "Service not found" });
      return;
    }
    res.json(updated);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
}

/**
 * DELETE /api/services/:id — Protected
 */
export async function remove(req: Request, res: Response): Promise<void> {
  try {
    const deleted = await dbService.deleteService(req.params.id as string);
    if (!deleted) {
      res.status(404).json({ error: "Service not found" });
      return;
    }
    res.json({ message: "Service deleted successfully", deleted });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}
