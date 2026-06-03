import fs from "fs";
import path from "path";
import { isMongoConnected } from "../config/db";
import { Service } from "../models/service";
import { TeamMember } from "../models/team";
import { FlowNode } from "../models/portfolio";
import { Lead } from "../models/lead";
import { DEFAULT_SERVICES, DEFAULT_TEAM, DEFAULT_PORTFOLIO } from "./seeder_data";

const DATA_DIR = path.join(__dirname, "../../data");

// Helper to ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

const FILES = {
  services: path.join(DATA_DIR, "services.json"),
  team: path.join(DATA_DIR, "team.json"),
  portfolio: path.join(DATA_DIR, "portfolio.json"),
  leads: path.join(DATA_DIR, "leads.json")
};

// Read from JSON file
function readJSON(type: keyof typeof FILES, defaults: any[]) {
  const filePath = FILES[type];
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify(defaults, null, 2));
    return defaults;
  }
  try {
    const data = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(data);
  } catch (e) {
    return defaults;
  }
}

// Write to JSON file
function writeJSON(type: keyof typeof FILES, data: any[]) {
  const filePath = FILES[type];
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

// ==========================================
// UNIFIED ACCESS LAYER (MONGO / JSON FALLBACK)
// ==========================================

export const dbService = {
  // Services operations
  async getServices() {
    if (isMongoConnected()) {
      return await Service.find({});
    } else {
      console.log("⚠ MongoDB disconnected. Using Local JSON fallback database.");
      return readJSON("services", DEFAULT_SERVICES);
    }
  },
  async createService(data: any) {
    if (isMongoConnected()) {
      const item = new Service(data);
      return await item.save();
    } else {
      const list = readJSON("services", DEFAULT_SERVICES);
      if (list.some((item: any) => item.id === data.id)) {
        throw new Error("Duplicate Service ID");
      }
      list.push(data);
      writeJSON("services", list);
      return data;
    }
  },
  async updateService(id: string, data: any) {
    if (isMongoConnected()) {
      return await Service.findOneAndUpdate({ id }, data, { new: true, runValidators: true });
    } else {
      const list = readJSON("services", DEFAULT_SERVICES);
      const idx = list.findIndex((item: any) => item.id === id);
      if (idx === -1) return null;
      list[idx] = { ...list[idx], ...data };
      writeJSON("services", list);
      return list[idx];
    }
  },
  async deleteService(id: string) {
    if (isMongoConnected()) {
      return await Service.findOneAndDelete({ id });
    } else {
      const list = readJSON("services", DEFAULT_SERVICES);
      const idx = list.findIndex((item: any) => item.id === id);
      if (idx === -1) return null;
      const deleted = list.splice(idx, 1)[0];
      writeJSON("services", list);
      return deleted;
    }
  },

  // Team operations
  async getTeam() {
    if (isMongoConnected()) {
      return await TeamMember.find({});
    } else {
      return readJSON("team", DEFAULT_TEAM);
    }
  },
  async createTeam(data: any) {
    if (isMongoConnected()) {
      const item = new TeamMember(data);
      return await item.save();
    } else {
      const list = readJSON("team", DEFAULT_TEAM);
      if (list.some((item: any) => item.id === data.id)) {
        throw new Error("Duplicate Team Member ID");
      }
      list.push(data);
      writeJSON("team", list);
      return data;
    }
  },
  async updateTeam(id: string, data: any) {
    if (isMongoConnected()) {
      return await TeamMember.findOneAndUpdate({ id }, data, { new: true, runValidators: true });
    } else {
      const list = readJSON("team", DEFAULT_TEAM);
      const idx = list.findIndex((item: any) => item.id === id);
      if (idx === -1) return null;
      list[idx] = { ...list[idx], ...data };
      writeJSON("team", list);
      return list[idx];
    }
  },
  async deleteTeam(id: string) {
    if (isMongoConnected()) {
      return await TeamMember.findOneAndDelete({ id });
    } else {
      const list = readJSON("team", DEFAULT_TEAM);
      const idx = list.findIndex((item: any) => item.id === id);
      if (idx === -1) return null;
      const deleted = list.splice(idx, 1)[0];
      writeJSON("team", list);
      return deleted;
    }
  },

  // Portfolio Map operations
  async getPortfolio() {
    if (isMongoConnected()) {
      return await FlowNode.find({});
    } else {
      return readJSON("portfolio", DEFAULT_PORTFOLIO);
    }
  },
  async createPortfolio(data: any) {
    if (isMongoConnected()) {
      const item = new FlowNode(data);
      return await item.save();
    } else {
      const list = readJSON("portfolio", DEFAULT_PORTFOLIO);
      if (list.some((item: any) => item.id === data.id)) {
        throw new Error("Duplicate Portfolio Node ID");
      }
      list.push(data);
      writeJSON("portfolio", list);
      return data;
    }
  },
  async updatePortfolio(id: string, data: any) {
    if (isMongoConnected()) {
      return await FlowNode.findOneAndUpdate({ id }, data, { new: true, runValidators: true });
    } else {
      const list = readJSON("portfolio", DEFAULT_PORTFOLIO);
      const idx = list.findIndex((item: any) => item.id === id);
      if (idx === -1) return null;
      list[idx] = { ...list[idx], ...data };
      writeJSON("portfolio", list);
      return list[idx];
    }
  },
  async deletePortfolio(id: string) {
    if (isMongoConnected()) {
      return await FlowNode.findOneAndDelete({ id });
    } else {
      const list = readJSON("portfolio", DEFAULT_PORTFOLIO);
      const idx = list.findIndex((item: any) => item.id === id);
      if (idx === -1) return null;
      const deleted = list.splice(idx, 1)[0];
      writeJSON("portfolio", list);
      return deleted;
    }
  },

  async getLeads(options?: { page?: number; limit?: number; search?: string }) {
    const page = options?.page || 1;
    const limit = options?.limit || 10;
    const search = options?.search || "";

    const skip = (page - 1) * limit;

    if (isMongoConnected()) {
      const query: any = {};
      if (search) {
        query.$or = [
          { name: { $regex: search, $options: "i" } },
          { email: { $regex: search, $options: "i" } },
          { brand: { $regex: search, $options: "i" } },
          { message: { $regex: search, $options: "i" } }
        ];
      }

      const totalLeads = await Lead.countDocuments(query);
      const data = await Lead.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit);

      return {
        data,
        pagination: {
          page,
          limit,
          totalLeads,
          totalPages: Math.ceil(totalLeads / limit)
        }
      };
    } else {
      let data = readJSON("leads", []).sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      
      if (search) {
        const lowerSearch = search.toLowerCase();
        data = data.filter((item: any) => 
          (item.name && item.name.toLowerCase().includes(lowerSearch)) ||
          (item.email && item.email.toLowerCase().includes(lowerSearch)) ||
          (item.brand && item.brand.toLowerCase().includes(lowerSearch)) ||
          (item.message && item.message.toLowerCase().includes(lowerSearch))
        );
      }

      const totalLeads = data.length;
      const paginatedData = data.slice(skip, skip + limit);

      return {
        data: paginatedData,
        pagination: {
          page,
          limit,
          totalLeads,
          totalPages: Math.ceil(totalLeads / limit)
        }
      };
    }
  },

  async createLead(data: any) {
    const leadData = {
      ...data,
      createdAt: data.createdAt || new Date(),
      id: data.id || Math.random().toString(36).substring(2, 9)
    };
    if (isMongoConnected()) {
      const item = new Lead(leadData);
      return await item.save();
    } else {
      const list = readJSON("leads", []);
      list.push(leadData);
      writeJSON("leads", list);
      return leadData;
    }
  },
  async deleteLead(id: string) {
    if (isMongoConnected()) {
      // Try both _id and custom id field for consistency
      const byObjectId = await Lead.findByIdAndDelete(id).catch(() => null);
      if (byObjectId) return byObjectId;
      return await Lead.findOneAndDelete({ id });
    } else {
      const list = readJSON("leads", []);
      const idx = list.findIndex((item: any) => item.id === id);
      if (idx === -1) return null;
      const deleted = list.splice(idx, 1)[0];
      writeJSON("leads", list);
      return deleted;
    }
  }
};
