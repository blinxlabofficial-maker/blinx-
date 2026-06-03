import { Request, Response } from "express";
import { dbService } from "../services/local_db";
import { sendLeadNotification, sendLeadConfirmation } from "../services/emailService";
import { logger } from "../config/logger";

/**
 * GET /api/leads — Protected (admin only)
 * Query parameters: page, limit, search
 */
export async function getAll(req: Request, res: Response): Promise<void> {
  try {
    const page = parseInt(req.query.page as string || "1");
    const limit = parseInt(req.query.limit as string || "10");
    const search = req.query.search as string || "";

    const leads = await dbService.getLeads({ page, limit, search });
    res.json(leads);
  } catch (error: any) {
    logger.error(`Error in getAll leads: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
}

/**
 * POST /api/leads — Public (contact form submission)
 */
export async function create(req: Request, res: Response): Promise<void> {
  try {
    const saved = await dbService.createLead(req.body);

    // Truly non-blocking email notifications run in the background
    setImmediate(() => {
      sendLeadNotification(saved)
        .catch(emailError => logger.warn(`⚠ Lead notification email failed: ${emailError.message}`));
      sendLeadConfirmation(saved)
        .catch(emailError => logger.warn(`⚠ Lead confirmation email failed: ${emailError.message}`));
    });

    res.status(201).json(saved);
  } catch (error: any) {
    logger.error(`Error in create lead: ${error.message}`);
    res.status(400).json({ error: error.message });
  }
}

/**
 * DELETE /api/leads/:id — Protected (admin only)
 */
export async function remove(req: Request, res: Response): Promise<void> {
  try {
    const deleted = await dbService.deleteLead(req.params.id as string);
    if (!deleted) {
      res.status(404).json({ error: "Lead not found" });
      return;
    }
    res.json({ message: "Lead deleted successfully", deleted });
  } catch (error: any) {
    logger.error(`Error in remove lead: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
}
