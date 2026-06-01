import express from "express";
import { authenticateAdmin } from "../middlewares/auth";
import { validate } from "../middlewares/validate";
import {
  createServiceSchema,
  updateServiceSchema,
  createTeamSchema,
  updateTeamSchema,
  createPortfolioSchema,
  updatePortfolioSchema,
  createLeadSchema
} from "../validators/schemas";

// Controllers
import * as serviceCtrl from "../controllers/serviceController";
import * as teamCtrl from "../controllers/teamController";
import * as portfolioCtrl from "../controllers/portfolioController";
import * as leadCtrl from "../controllers/leadController";

const router = express.Router();

// ==========================================
// SERVICES API
// ==========================================

// Public
router.get("/services", serviceCtrl.getAll);
router.get("/services/:id", serviceCtrl.getById);

// Protected (admin only)
router.post("/services", authenticateAdmin, validate(createServiceSchema), serviceCtrl.create);
router.put("/services/:id", authenticateAdmin, validate(updateServiceSchema), serviceCtrl.update);
router.delete("/services/:id", authenticateAdmin, serviceCtrl.remove);

// ==========================================
// TEAM MEMBERS API
// ==========================================

// Public
router.get("/team", teamCtrl.getAll);

// Protected (admin only)
router.post("/team", authenticateAdmin, validate(createTeamSchema), teamCtrl.create);
router.put("/team/:id", authenticateAdmin, validate(updateTeamSchema), teamCtrl.update);
router.delete("/team/:id", authenticateAdmin, teamCtrl.remove);

// ==========================================
// PORTFOLIO / INTERACTIVE MAP API
// ==========================================

// Public
router.get("/portfolio", portfolioCtrl.getAll);
router.get("/portfolio/:id", portfolioCtrl.getById);

// Protected (admin only)
router.post("/portfolio", authenticateAdmin, validate(createPortfolioSchema), portfolioCtrl.create);
router.put("/portfolio/:id", authenticateAdmin, validate(updatePortfolioSchema), portfolioCtrl.update);
router.delete("/portfolio/:id", authenticateAdmin, portfolioCtrl.remove);

// ==========================================
// LEADS API
// ==========================================

// Public (contact form)
router.post("/leads", validate(createLeadSchema), leadCtrl.create);

// Protected (admin only)
router.get("/leads", authenticateAdmin, leadCtrl.getAll);
router.delete("/leads/:id", authenticateAdmin, leadCtrl.remove);

export default router;
