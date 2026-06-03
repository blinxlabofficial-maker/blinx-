import { z } from "zod";

// ==========================================
// VALID COLOR ENUMS (matching frontend design system)
// ==========================================
const colorEnum = z.enum([
  "bg-electric-red",
  "bg-voltage-yellow",
  "bg-ink-black",
  "bg-studio-white"
]);

const textColorEnum = z.enum([
  "text-ink-black",
  "text-studio-white"
]);

// ==========================================
// SHARED SUB-SCHEMAS
// ==========================================
const metricSchema = z.object({
  label: z.string().min(1, "Metric label is required"),
  value: z.string().min(1, "Metric value is required")
});

// ==========================================
// SERVICE SCHEMAS
// ==========================================
export const createServiceSchema = z.object({
  id: z.string()
    .min(2, "ID must be at least 2 characters")
    .max(50, "ID must be at most 50 characters")
    .regex(/^[a-z0-9-]+$/, "ID must be lowercase alphanumeric with hyphens only"),
  title: z.string().min(1, "Title is required").max(100),
  subtitle: z.string().min(1, "Subtitle is required").max(200),
  description: z.string().min(1, "Description is required").max(2000),
  color: colorEnum.default("bg-electric-red"),
  textColor: textColorEnum.default("text-ink-black"),
  metrics: z.array(metricSchema).default([])
});

export const updateServiceSchema = createServiceSchema.partial().omit({ id: true });

// ==========================================
// TEAM MEMBER SCHEMAS
// ==========================================
export const createTeamSchema = z.object({
  id: z.string()
    .min(2, "ID must be at least 2 characters")
    .max(50),
  name: z.string().min(1, "Name is required").max(100),
  role: z.string().min(1, "Role is required").max(100),
  specialty: z.string().min(1, "Specialty is required").max(100),
  color: colorEnum.default("bg-electric-red"),
  photo: z.string().optional()
});

export const updateTeamSchema = createTeamSchema.partial().omit({ id: true });

// ==========================================
// PORTFOLIO / FLOW NODE SCHEMAS
// ==========================================
const nodeTypeEnum = z.enum(["root", "service", "client", "work"]);

const caseStudySchema = z.object({
  description: z.string().default(""),
  media: z.array(z.string().url("Each media item must be a valid URL").or(z.string().max(0))).default([])
});

export const createPortfolioSchema = z.object({
  id: z.string().min(2).max(50),
  parentId: z.string().nullable().default(null),
  type: nodeTypeEnum,
  title: z.string().min(1, "Title is required").max(100),
  subtitle: z.string().min(1, "Subtitle is required").max(200),
  color: colorEnum.default("bg-electric-red"),
  chips: z.array(z.string().max(30)).default([]),
  metrics: z.array(metricSchema).default([]),
  caseStudy: caseStudySchema.optional()
});

export const updatePortfolioSchema = createPortfolioSchema.partial().omit({ id: true });

// ==========================================
// LEAD SCHEMAS
// ==========================================
const budgetEnum = z.enum(["10k", "50k", "100k", "max"]);

export const createLeadSchema = z.object({
  name: z.string().min(1, "Name is required").max(100),
  email: z.string().email("Please provide a valid email address"),
  brand: z.string().min(1, "Brand is required").max(100),
  budget: budgetEnum,
  message: z.string().min(10, "Message must be at least 10 characters").max(5000)
});

// ==========================================
// AUTH SCHEMAS
// ==========================================
export const loginSchema = z.object({
  email: z.string().email("Please provide a valid email address"),
  password: z.string().min(1, "Password is required")
});

export const changePasswordSchema = z.object({
  currentPassword: z.string().min(1, "Current password is required"),
  newPassword: z.string().min(6, "New password must be at least 6 characters")
});

// ==========================================
// PARAM SCHEMAS
// ==========================================
export const idParamSchema = z.object({
  id: z.string().min(1, "ID is required")
});
