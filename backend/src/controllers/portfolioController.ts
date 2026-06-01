import { Request, Response } from "express";
import { dbService } from "../services/local_db";

/**
 * GET /api/portfolio — Public
 */
export async function getAll(req: Request, res: Response): Promise<void> {
  try {
    const nodes = await dbService.getPortfolio();
    res.json(nodes);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}

/**
 * GET /api/portfolio/:id — Public
 */
export async function getById(req: Request, res: Response): Promise<void> {
  try {
    const nodes = await dbService.getPortfolio();
    const node = nodes.find((n: any) => n.id === req.params.id);
    if (!node) {
      res.status(404).json({ error: "Portfolio node not found" });
      return;
    }
    res.json(node);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}

/**
 * POST /api/portfolio — Protected
 */
export async function create(req: Request, res: Response): Promise<void> {
  try {
    const saved = await dbService.createPortfolio(req.body);
    res.status(201).json(saved);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
}

/**
 * PUT /api/portfolio/:id — Protected
 */
export async function update(req: Request, res: Response): Promise<void> {
  try {
    const updated = await dbService.updatePortfolio(req.params.id as string, req.body);
    if (!updated) {
      res.status(404).json({ error: "Portfolio node not found" });
      return;
    }
    res.json(updated);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
}

/**
 * DELETE /api/portfolio/:id — Protected
 */
export async function remove(req: Request, res: Response): Promise<void> {
  try {
    const deleted = await dbService.deletePortfolio(req.params.id as string);
    if (!deleted) {
      res.status(404).json({ error: "Portfolio node not found" });
      return;
    }
    res.json({ message: "Portfolio node deleted successfully", deleted });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}
