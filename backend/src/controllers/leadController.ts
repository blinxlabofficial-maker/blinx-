import { Request, Response } from "express";
import { dbService } from "../services/local_db";
import { sendLeadNotification, sendLeadConfirmation } from "../services/emailService";

/**
 * GET /api/leads — Protected (admin only)
 */
export async function getAll(req: Request, res: Response): Promise<void> {
  try {
    const leads = await dbService.getLeads();
    res.json(leads);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}

/**
 * POST /api/leads — Public (contact form submission)
 */
export async function create(req: Request, res: Response): Promise<void> {
  try {
    const saved = await dbService.createLead(req.body);

    // Send email notifications (non-blocking — don't fail the request if email fails)
    try {
      await sendLeadNotification(saved);
      await sendLeadConfirmation(saved);
    } catch (emailError) {
      console.warn("⚠ Email notification failed:", emailError);
    }

    res.status(201).json(saved);
  } catch (error: any) {
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
    res.status(500).json({ error: error.message });
  }
}
