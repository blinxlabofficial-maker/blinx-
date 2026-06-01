import { Request, Response } from "express";
import { dbService } from "../services/local_db";

/**
 * GET /api/team — Public
 */
export async function getAll(req: Request, res: Response): Promise<void> {
  try {
    const team = await dbService.getTeam();
    res.json(team);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}

/**
 * POST /api/team — Protected
 */
export async function create(req: Request, res: Response): Promise<void> {
  try {
    const saved = await dbService.createTeam(req.body);
    res.status(201).json(saved);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
}

/**
 * PUT /api/team/:id — Protected
 */
export async function update(req: Request, res: Response): Promise<void> {
  try {
    const updated = await dbService.updateTeam(req.params.id as string, req.body);
    if (!updated) {
      res.status(404).json({ error: "Team member not found" });
      return;
    }
    res.json(updated);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
}

/**
 * DELETE /api/team/:id — Protected
 */
export async function remove(req: Request, res: Response): Promise<void> {
  try {
    const deleted = await dbService.deleteTeam(req.params.id as string);
    if (!deleted) {
      res.status(404).json({ error: "Team member not found" });
      return;
    }
    res.json({ message: "Team member deleted successfully", deleted });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}
