import React, { useState, useEffect } from "react";
import "./App.css";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// Interfaces
interface Metric {
  label: string;
  value: string;
}

interface ServiceItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  color: string;
  textColor: string;
  metrics: Metric[];
}

interface TeamMemberItem {
  id: string;
  name: string;
  role: string;
  specialty: string;
  color: string;
  photo?: string;
}

interface FlowNodeItem {
  id: string;
  parentId: string | null;
  type: "root" | "service" | "client" | "work";
  title: string;
  subtitle: string;
  color: string;
  chips?: string[];
  metrics?: Metric[];
  caseStudy?: {
    description: string;
    media: string[];
  };
}

interface LeadItem {
  _id?: string;
  id?: string;
  name: string;
  email: string;
  brand: string;
  budget: string;
  message: string;
  createdAt: string;
}

export default function App() {
  // Auth State
  const [authToken, setAuthToken] = useState<string | null>(localStorage.getItem("blinx_admin_token"));
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState("");

  // Auth header helper
  const getAuthHeaders = (): Record<string, string> => {
    const headers: Record<string, string> = { "Content-Type": "application/json" };
    if (authToken) headers["Authorization"] = `Bearer ${authToken}`;
    return headers;
  };

  // Login handler
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginLoading(true);
    setLoginError("");
    try {
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginForm)
      });
      const data = await res.json();
      if (res.ok && data.token) {
        localStorage.setItem("blinx_admin_token", data.token);
        setAuthToken(data.token);
      } else {
        setLoginError(data.error || "Login failed.");
      }
    } catch {
      setLoginError("Backend offline. Ensure server is running on port 5000.");
    } finally {
      setLoginLoading(false);
    }
  };

  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem("blinx_admin_token");
    setAuthToken(null);
  };

  // Tabs State: "services" | "portfolio" | "team" | "leads"
  const [activeTab, setActiveTab] = useState<"services" | "portfolio" | "team" | "leads">("services");
  
  // Data States
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [portfolio, setPortfolio] = useState<FlowNodeItem[]>([]);
  const [team, setTeam] = useState<TeamMemberItem[]>([]);
  const [leads, setLeads] = useState<LeadItem[]>([]);
  
  // Loading & Error States
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  // Modal control
  const [modalOpen, setModalOpen] = useState(false);
  const [editItemType, setEditItemType] = useState<"services" | "portfolio" | "team" | null>(null);
  const [editMode, setEditMode] = useState(false); // true if editing, false if creating

  // Form Field States
  // 1. Services Form State
  const [serviceForm, setServiceForm] = useState<ServiceItem>({
    id: "",
    title: "",
    subtitle: "",
    description: "",
    color: "bg-electric-red",
    textColor: "text-ink-black",
    metrics: []
  });

  // 2. Portfolio Form State
  const [portfolioForm, setPortfolioForm] = useState<FlowNodeItem>({
    id: "",
    parentId: "",
    type: "work",
    title: "",
    subtitle: "",
    color: "bg-electric-red",
    chips: [],
    metrics: [],
    caseStudy: { description: "", media: [] }
  });

  // 3. Team Form State
  const [teamForm, setTeamForm] = useState<TeamMemberItem>({
    id: "",
    name: "",
    role: "",
    specialty: "",
    color: "bg-electric-red",
    photo: ""
  });

  // Toast auto-dismiss
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  // Fetch all databases on load
  const fetchData = async () => {
    setLoading(true);
    try {
      const authHeaders = getAuthHeaders();
      const [resServices, resPortfolio, resTeam, resLeads] = await Promise.all([
        fetch(`${API_BASE}/services`).then(res => res.json()),
        fetch(`${API_BASE}/portfolio`).then(res => res.json()),
        fetch(`${API_BASE}/team`).then(res => res.json()),
        fetch(`${API_BASE}/leads`, { headers: authHeaders }).then(res => {
          if (res.status === 401) { handleLogout(); return []; }
          return res.json();
        })
      ]);
      setServices(Array.isArray(resServices) ? resServices : []);
      setPortfolio(Array.isArray(resPortfolio) ? resPortfolio : []);
      setTeam(Array.isArray(resTeam) ? resTeam : []);
      
      if (resLeads && typeof resLeads === "object" && "data" in resLeads && Array.isArray(resLeads.data)) {
        setLeads(resLeads.data);
      } else {
        setLeads(Array.isArray(resLeads) ? resLeads : []);
      }
    } catch (error) {
      showToast("Backend Server Offline. Make sure backend runs on port 5000.", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (authToken) fetchData();
  }, [authToken]);

  const showToast = (message: string, type: "success" | "error" = "success") => {
    setToast({ message, type });
  };

  // ==========================================
  // CRUD Actions
  // ==========================================

  // Delete Handler
  const handleDelete = async (type: "services" | "portfolio" | "team" | "leads", id: string) => {
    if (!window.confirm(`Are you sure you want to delete this record?`)) return;
    try {
      const response = await fetch(`${API_BASE}/${type}/${id}`, {
        method: "DELETE",
        headers: getAuthHeaders()
      });
      if (response.ok) {
        showToast(`Record successfully deleted.`);
        fetchData();
      } else {
        const err = await response.json();
        showToast(`Delete failed: ${err.error}`, "error");
      }
    } catch (e) {
      showToast("Network error when deleting.", "error");
    }
  };

  // Open Create Modal
  const openCreateModal = (type: "services" | "portfolio" | "team") => {
    setEditItemType(type);
    setEditMode(false);
    if (type === "services") {
      setServiceForm({
        id: "",
        title: "",
        subtitle: "",
        description: "",
        color: "bg-electric-red",
        textColor: "text-ink-black",
        metrics: []
      });
    } else if (type === "portfolio") {
      setPortfolioForm({
        id: "",
        parentId: "",
        type: "work",
        title: "",
        subtitle: "",
        color: "bg-electric-red",
        chips: [],
        metrics: [],
        caseStudy: { description: "", media: [] }
      });
    } else if (type === "team") {
      setTeamForm({
        id: "",
        name: "",
        role: "",
        specialty: "",
        color: "bg-electric-red",
        photo: ""
      });
    }
    setModalOpen(true);
  };

  // Open Edit Modal
  const openEditModal = (type: "services" | "portfolio" | "team", item: any) => {
    setEditItemType(type);
    setEditMode(true);
    if (type === "services") {
      setServiceForm({ ...item, metrics: item.metrics || [] });
    } else if (type === "portfolio") {
      setPortfolioForm({
        ...item,
        parentId: item.parentId || "",
        chips: item.chips || [],
        metrics: item.metrics || [],
        caseStudy: item.caseStudy || { description: "", media: [] }
      });
    } else if (type === "team") {
      setTeamForm({
        ...item,
        photo: item.photo || ""
      });
    }
    setModalOpen(true);
  };

  // Form Submit Handler
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editItemType) return;

    let payload: any;
    let endpoint = `${API_BASE}/${editItemType}`;
    let method = editMode ? "PUT" : "POST";

    if (editItemType === "services") {
      if (!serviceForm.id || !serviceForm.title) {
        showToast("ID and Title are required.", "error");
        return;
      }
      payload = serviceForm;
      if (editMode) endpoint += `/${serviceForm.id}`;
    } else if (editItemType === "portfolio") {
      if (!portfolioForm.id || !portfolioForm.title) {
        showToast("ID and Title are required.", "error");
        return;
      }
      payload = {
        ...portfolioForm,
        parentId: portfolioForm.parentId === "" ? null : portfolioForm.parentId
      };
      if (editMode) endpoint += `/${portfolioForm.id}`;
    } else if (editItemType === "team") {
      if (!teamForm.id || !teamForm.name) {
        showToast("ID and Name are required.", "error");
        return;
      }
      payload = teamForm;
      if (editMode) endpoint += `/${teamForm.id}`;
    }

    try {
      const response = await fetch(endpoint, {
        method,
        headers: getAuthHeaders(),
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        showToast(`Successfully saved changes!`);
        setModalOpen(false);
        fetchData();
      } else {
        const err = await response.json();
        showToast(`Save failed: ${err.error}`, "error");
      }
    } catch (err) {
      showToast("Network error while saving.", "error");
    }
  };

  // Dynamic Array Input Helpers
  // 1. Service Metrics Helper
  const handleServiceMetricChange = (index: number, key: keyof Metric, val: string) => {
    const updated = [...serviceForm.metrics];
    updated[index][key] = val;
    setServiceForm({ ...serviceForm, metrics: updated });
  };
  const addServiceMetric = () => {
    setServiceForm({
      ...serviceForm,
      metrics: [...serviceForm.metrics, { label: "", value: "" }]
    });
  };
  const removeServiceMetric = (index: number) => {
    const updated = [...serviceForm.metrics];
    updated.splice(index, 1);
    setServiceForm({ ...serviceForm, metrics: updated });
  };

  // 2. Portfolio Array Helpers
  // Chips
  const handleChipChange = (index: number, val: string) => {
    const updated = [...(portfolioForm.chips || [])];
    updated[index] = val;
    setPortfolioForm({ ...portfolioForm, chips: updated });
  };
  const addChip = () => {
    setPortfolioForm({
      ...portfolioForm,
      chips: [...(portfolioForm.chips || []), ""]
    });
  };
  const removeChip = (index: number) => {
    const updated = [...(portfolioForm.chips || [])];
    updated.splice(index, 1);
    setPortfolioForm({ ...portfolioForm, chips: updated });
  };
  // Portfolio Metrics
  const handlePortfolioMetricChange = (index: number, key: keyof Metric, val: string) => {
    const updated = [...(portfolioForm.metrics || [])];
    updated[index][key] = val;
    setPortfolioForm({ ...portfolioForm, metrics: updated });
  };
  const addPortfolioMetric = () => {
    setPortfolioForm({
      ...portfolioForm,
      metrics: [...(portfolioForm.metrics || []), { label: "", value: "" }]
    });
  };
  const removePortfolioMetric = (index: number) => {
    const updated = [...(portfolioForm.metrics || [])];
    updated.splice(index, 1);
    setPortfolioForm({ ...portfolioForm, metrics: updated });
  };
  // Case Study Media
  const handleMediaChange = (index: number, val: string) => {
    const mediaList = [...(portfolioForm.caseStudy?.media || [])];
    mediaList[index] = val;
    setPortfolioForm({
      ...portfolioForm,
      caseStudy: {
        description: portfolioForm.caseStudy?.description || "",
        media: mediaList
      }
    });
  };
  const addMediaUrl = () => {
    const currentMedia = portfolioForm.caseStudy?.media || [];
    setPortfolioForm({
      ...portfolioForm,
      caseStudy: {
        description: portfolioForm.caseStudy?.description || "",
        media: [...currentMedia, ""]
      }
    });
  };
  const removeMediaUrl = (index: number) => {
    const mediaList = [...(portfolioForm.caseStudy?.media || [])];
    mediaList.splice(index, 1);
    setPortfolioForm({
      ...portfolioForm,
      caseStudy: {
        description: portfolioForm.caseStudy?.description || "",
        media: mediaList
      }
    });
  };

  // Format Budget helpers
  const formatBudget = (val: string) => {
    switch (val) {
      case "10k": return "Under $10K";
      case "50k": return "$10K - $50K";
      case "100k": return "$50K - $100K";
      case "max": return "$100K+";
      default: return val;
    }
  };

  // ==========================================
  // RENDER: LOGIN SCREEN (if not authenticated)
  // ==========================================
  if (!authToken) {
    return (
      <div className="dashboard-container" style={{ justifyContent: "center", alignItems: "center", display: "flex", minHeight: "100vh", background: "var(--ink-black)" }}>
        <div style={{ maxWidth: 420, width: "100%", padding: "3rem", border: "2px solid var(--studio-white)", background: "var(--surface-dark)" }}>
          <div className="brand" style={{ marginBottom: "2rem", textAlign: "center" }}>
            <span className="brand-title" style={{ fontSize: "2.5rem" }}>BLINX<span className="brand-dot">_</span></span>
            <span className="brand-tag" style={{ display: "block", marginTop: "0.5rem" }}>Admin Authentication</span>
          </div>
          {loginError && (
            <div style={{ background: "rgba(255,60,90,0.15)", border: "2px solid var(--electric-red)", padding: "0.75rem 1rem", marginBottom: "1.5rem", color: "var(--electric-red)", fontFamily: "var(--font-mono)", fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "1px" }}>
              ⚠ {loginError}
            </div>
          )}
          <form onSubmit={handleLogin}>
            <div className="form-group" style={{ marginBottom: "1.5rem" }}>
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-input"
                value={loginForm.email}
                onChange={e => setLoginForm({ ...loginForm, email: e.target.value })}
                placeholder="admin@blinxlab.com"
                required
              />
            </div>
            <div className="form-group" style={{ marginBottom: "2rem" }}>
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-input"
                value={loginForm.password}
                onChange={e => setLoginForm({ ...loginForm, password: e.target.value })}
                placeholder="••••••••"
                required
              />
            </div>
            <button
              type="submit"
              className="action-btn"
              style={{ width: "100%", padding: "1rem", fontSize: "1.1rem" }}
              disabled={loginLoading}
            >
              {loginLoading ? "AUTHENTICATING..." : "⚡ LOGIN"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // ==========================================
  // RENDER: MAIN DASHBOARD
  // ==========================================
  return (
    <>
      {/* Toast Alert */}
      {toast && (
        <div className={`alert-toast ${toast.type === "error" ? "error" : ""}`}>
          <span className="font-mono">{toast.type === "error" ? "⚠ ERROR:" : "✓ SUCCESS:"}</span>
          <span>{toast.message}</span>
        </div>
      )}

      <div className="dashboard-container">

      {/* Sidebar Panel */}
      <aside className="sidebar">
        <div>
          <div className="brand">
            <span className="brand-title">BLINX<span className="brand-dot">_</span></span>
            <span className="brand-tag">Admin Panel</span>
          </div>
          <nav className="nav-menu">
            <button
              className={`nav-item ${activeTab === "services" ? "active" : ""}`}
              onClick={() => setActiveTab("services")}
            >
              Arsenal (Services)
            </button>
            <button
              className={`nav-item ${activeTab === "portfolio" ? "active" : ""}`}
              onClick={() => setActiveTab("portfolio")}
            >
              Interactive Map
            </button>
            <button
              className={`nav-item ${activeTab === "team" ? "active" : ""}`}
              onClick={() => setActiveTab("team")}
            >
              Cult Team
            </button>
            <button
              className={`nav-item ${activeTab === "leads" ? "active" : ""}`}
              onClick={() => setActiveTab("leads")}
              style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
            >
              <span>Incoming Leads</span>
              {leads.length > 0 && (
                <span className="badge" style={{ backgroundColor: "var(--electric-red)", color: "var(--ink-black)", border: "none", margin: 0, padding: "0.1rem 0.4rem", borderRadius: "3px" }}>
                  {leads.length}
                </span>
              )}
            </button>
          </nav>
        </div>
        <div className="sidebar-footer">
          ⚡ System Ready — v2.0.0
          <button
            onClick={handleLogout}
            style={{ display: "block", marginTop: "0.75rem", background: "none", border: "1px solid var(--electric-red)", color: "var(--electric-red)", padding: "0.4rem 0.8rem", cursor: "pointer", fontFamily: "var(--font-mono)", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "1px", width: "100%" }}
          >
            Logout
          </button>
        </div>
      </aside>

      {/* Main Panel Content */}
      <main className="main-content">
        {activeTab === "services" && (
          <div>
            <div className="content-header">
              <div>
                <h1 className="page-title">Arsenal</h1>
                <p className="subtitle">Manage list of active creative services</p>
              </div>
              <button className="action-btn" onClick={() => openCreateModal("services")}>
                + Add Service
              </button>
            </div>

            {loading ? (
              <div className="loader-container">
                <div className="spinner"></div>
                <p className="font-mono uppercase text-sm">Fetching service records...</p>
              </div>
            ) : services.length === 0 ? (
              <div className="empty-state">
                <p className="empty-state-title">No Services Found</p>
                <p className="empty-state-desc">Click '+ Add Service' above to add your first service category.</p>
              </div>
            ) : (
              <div className="card-table-container">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>ID / Slug</th>
                      <th>Title</th>
                      <th>Subtitle</th>
                      <th>Theme Color</th>
                      <th>Metrics</th>
                      <th style={{ textAlign: "right" }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {services.map(item => (
                      <tr key={item.id}>
                        <td className="font-mono text-sm">{item.id}</td>
                        <td style={{ fontWeight: 700 }}>{item.title}</td>
                        <td style={{ color: "#aaa" }}>{item.subtitle}</td>
                        <td>
                          <span className={`badge color-${item.color}`}>
                            {item.color}
                          </span>
                        </td>
                        <td>
                          {item.metrics?.map((m, idx) => (
                            <span key={idx} className="badge bg-medium" style={{ borderColor: "#444" }}>
                              {m.label}: {m.value}
                            </span>
                          ))}
                        </td>
                        <td style={{ textAlign: "right" }}>
                          <button className="action-btn secondary" style={{ marginRight: "0.5rem", padding: "0.4rem 0.8rem", fontSize: "0.85rem" }} onClick={() => openEditModal("services", item)}>
                            Edit
                          </button>
                          <button className="action-btn secondary text-danger" style={{ padding: "0.4rem 0.8rem", fontSize: "0.85rem" }} onClick={() => handleDelete("services", item.id)}>
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {activeTab === "portfolio" && (
          <div>
            <div className="content-header">
              <div>
                <h1 className="page-title">Interactive Map</h1>
                <p className="subtitle">Manage flowchart nodes, clients, and case studies</p>
              </div>
              <button className="action-btn" onClick={() => openCreateModal("portfolio")}>
                + Add Node
              </button>
            </div>

            {loading ? (
              <div className="loader-container">
                <div className="spinner"></div>
                <p className="font-mono uppercase text-sm">Loading flowchart structure...</p>
              </div>
            ) : portfolio.length === 0 ? (
              <div className="empty-state">
                <p className="empty-state-title">Map is empty</p>
                <p className="empty-state-desc">Click '+ Add Node' to inject elements into your flowchart canvas.</p>
              </div>
            ) : (
              <div className="card-table-container">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Node ID</th>
                      <th>Parent ID</th>
                      <th>Type</th>
                      <th>Title</th>
                      <th>Subtitle</th>
                      <th>Color</th>
                      <th>Metrics/Chips</th>
                      <th style={{ textAlign: "right" }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {portfolio.map(node => (
                      <tr key={node.id}>
                        <td className="font-mono text-sm" style={{ fontWeight: 700 }}>{node.id}</td>
                        <td className="font-mono text-sm text-gray-light">{node.parentId || "none"}</td>
                        <td>
                          <span className="badge" style={{ borderColor: node.type === "root" ? "var(--voltage-yellow)" : "var(--studio-white)" }}>
                            {node.type}
                          </span>
                        </td>
                        <td style={{ fontWeight: 700 }}>{node.title}</td>
                        <td style={{ color: "#aaa" }}>{node.subtitle}</td>
                        <td>
                          <span className={`badge color-${node.color}`}>
                            {node.color}
                          </span>
                        </td>
                        <td>
                          {node.chips?.map((c, i) => (
                            <span key={i} className="badge bg-ink-black" style={{ borderStyle: "dashed" }}>
                              {c}
                            </span>
                          ))}
                          {node.metrics?.map((m, i) => (
                            <span key={i} className="badge" style={{ borderColor: "var(--voltage-yellow)" }}>
                              {m.label}: {m.value}
                            </span>
                          ))}
                        </td>
                        <td style={{ textAlign: "right" }}>
                          <button className="action-btn secondary" style={{ marginRight: "0.5rem", padding: "0.4rem 0.8rem", fontSize: "0.85rem" }} onClick={() => openEditModal("portfolio", node)}>
                            Edit
                          </button>
                          <button className="action-btn secondary text-danger" style={{ padding: "0.4rem 0.8rem", fontSize: "0.85rem" }} onClick={() => handleDelete("portfolio", node.id)}>
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {activeTab === "team" && (
          <div>
            <div className="content-header">
              <div>
                <h1 className="page-title">Cult Team</h1>
                <p className="subtitle">Manage tactical team member matrix profiles</p>
              </div>
              <button className="action-btn" onClick={() => openCreateModal("team")}>
                + Add Member
              </button>
            </div>

            {loading ? (
              <div className="loader-container">
                <div className="spinner"></div>
                <p className="font-mono uppercase text-sm">Loading team rosters...</p>
              </div>
            ) : team.length === 0 ? (
              <div className="empty-state">
                <p className="empty-state-title">No Team Members Found</p>
                <p className="empty-state-desc">Click '+ Add Member' above to grow your creative force.</p>
              </div>
            ) : (
              <div className="card-table-container">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Name</th>
                      <th>Role</th>
                      <th>Specialty Matrix</th>
                      <th>Display Color</th>
                      <th style={{ textAlign: "right" }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {team.map(member => (
                      <tr key={member.id}>
                        <td className="font-mono text-sm">{member.id}</td>
                        <td style={{ fontWeight: 700 }}>{member.name}</td>
                        <td>{member.role}</td>
                        <td style={{ color: "var(--voltage-yellow)" }}>{member.specialty}</td>
                        <td>
                          <span className={`badge color-${member.color}`}>
                            {member.color}
                          </span>
                        </td>
                        <td style={{ textAlign: "right" }}>
                          <button className="action-btn secondary" style={{ marginRight: "0.5rem", padding: "0.4rem 0.8rem", fontSize: "0.85rem" }} onClick={() => openEditModal("team", member)}>
                            Edit
                          </button>
                          <button className="action-btn secondary text-danger" style={{ padding: "0.4rem 0.8rem", fontSize: "0.85rem" }} onClick={() => handleDelete("team", member.id)}>
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {activeTab === "leads" && (
          <div>
            <div className="content-header">
              <div>
                <h1 className="page-title">Incoming Leads</h1>
                <p className="subtitle">Review transmissions generated by the website contact form</p>
              </div>
            </div>

            {loading ? (
              <div className="loader-container">
                <div className="spinner"></div>
                <p className="font-mono uppercase text-sm">Intercepting client transmissions...</p>
              </div>
            ) : leads.length === 0 ? (
              <div className="empty-state">
                <p className="empty-state-title">No Leads Found</p>
                <p className="empty-state-desc">Signals are quiet. Direct users to the contact page to generate leads.</p>
              </div>
            ) : (
              <div className="card-table-container">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Date / Time</th>
                      <th>Agent (Name)</th>
                      <th>Contact Vector</th>
                      <th>Brand Designation</th>
                      <th>Ammo (Budget)</th>
                      <th>Objective (Brief)</th>
                      <th style={{ textAlign: "right" }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {leads.map(lead => (
                      <tr key={lead._id || lead.id}>
                        <td className="font-mono text-sm text-gray-light" style={{ whiteSpace: "nowrap" }}>
                          {new Date(lead.createdAt).toLocaleString()}
                        </td>
                        <td style={{ fontWeight: 700 }}>{lead.name}</td>
                        <td className="font-mono text-sm text-voltage-yellow">{lead.email}</td>
                        <td style={{ fontWeight: 700 }}>{lead.brand}</td>
                        <td>
                          <span className="badge color-electric-red">
                            {formatBudget(lead.budget)}
                          </span>
                        </td>
                        <td>
                          <div style={{ maxWidth: "300px", fontSize: "0.9rem", color: "#ccc", whiteSpace: "normal" }}>
                            {lead.message}
                          </div>
                        </td>
                        <td style={{ textAlign: "right" }}>
                          <button
                            className="action-btn secondary text-danger"
                            style={{ padding: "0.4rem 0.8rem", fontSize: "0.85rem" }}
                            onClick={() => handleDelete("leads", lead._id || lead.id || "")}
                          >
                            Dismiss
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </main>

      {/* FORM CRUD MODAL */}
      {modalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2 className="modal-title">
              {editMode ? "Edit Record" : "Create New Record"} ({editItemType})
            </h2>

            <form onSubmit={handleFormSubmit}>
              {/* 1. SERVICES FORM SECTION */}
              {editItemType === "services" && (
                <div>
                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">Service Slug / ID *</label>
                      <input
                        type="text"
                        className="form-input font-mono"
                        value={serviceForm.id}
                        onChange={e => setServiceForm({ ...serviceForm, id: e.target.value })}
                        disabled={editMode}
                        placeholder="e.g., meta-ads"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Service Title *</label>
                      <input
                        type="text"
                        className="form-input"
                        value={serviceForm.title}
                        onChange={e => setServiceForm({ ...serviceForm, title: e.target.value })}
                        placeholder="e.g., Meta Ads Management"
                        required
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Subtitle</label>
                    <input
                      type="text"
                      className="form-input"
                      value={serviceForm.subtitle}
                      onChange={e => setServiceForm({ ...serviceForm, subtitle: e.target.value })}
                      placeholder="e.g., High-converting paid socials."
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Description</label>
                    <textarea
                      className="form-textarea"
                      value={serviceForm.description}
                      onChange={e => setServiceForm({ ...serviceForm, description: e.target.value })}
                      placeholder="Enter detailed agency pitch..."
                    ></textarea>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">Theme Background Color</label>
                      <select
                        className="form-select"
                        value={serviceForm.color}
                        onChange={e => setServiceForm({ ...serviceForm, color: e.target.value })}
                      >
                        <option value="bg-electric-red">Electric Red (Vibrant)</option>
                        <option value="bg-voltage-yellow">Voltage Yellow (Brutal)</option>
                        <option value="bg-ink-black">Ink Black (Minimal)</option>
                        <option value="bg-studio-white">Studio White (Clean)</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label className="form-label">Text Color Mode</label>
                      <select
                        className="form-select"
                        value={serviceForm.textColor}
                        onChange={e => setServiceForm({ ...serviceForm, textColor: e.target.value })}
                      >
                        <option value="text-ink-black">Black text</option>
                        <option value="text-studio-white">White text</option>
                      </select>
                    </div>
                  </div>

                  {/* Metrics Array */}
                  <div style={{ marginTop: "2rem" }}>
                    <label className="form-label" style={{ display: "block", marginBottom: "1rem" }}>
                      Arsenal Metrics (Key Value performance pairs)
                    </label>
                    {serviceForm.metrics.map((metric, index) => (
                      <div key={index} className="dynamic-list-row">
                        <input
                          type="text"
                          className="form-input"
                          style={{ flex: 1 }}
                          value={metric.label}
                          onChange={e => handleServiceMetricChange(index, "label", e.target.value)}
                          placeholder="Label (e.g. Avg ROAS)"
                        />
                        <input
                          type="text"
                          className="form-input"
                          style={{ flex: 1 }}
                          value={metric.value}
                          onChange={e => handleServiceMetricChange(index, "value", e.target.value)}
                          placeholder="Value (e.g. 10x)"
                        />
                        <button
                          type="button"
                          className="dynamic-list-btn"
                          onClick={() => removeServiceMetric(index)}
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      className="dynamic-list-btn add-btn"
                      onClick={addServiceMetric}
                    >
                      + Add Metric Card
                    </button>
                  </div>
                </div>
              )}

              {/* 2. PORTFOLIO MAP FORM SECTION */}
              {editItemType === "portfolio" && (
                <div>
                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">Node unique ID *</label>
                      <input
                        type="text"
                        className="form-input font-mono"
                        value={portfolioForm.id}
                        onChange={e => setPortfolioForm({ ...portfolioForm, id: e.target.value })}
                        disabled={editMode}
                        placeholder="e.g., cli-apex"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Parent Node ID (Links to parent flowchart node)</label>
                      <select
                        className="form-select font-mono text-sm"
                        value={portfolioForm.parentId || ""}
                        onChange={e => setPortfolioForm({ ...portfolioForm, parentId: e.target.value })}
                      >
                        <option value="">No Parent (Root Node)</option>
                        {portfolio
                          .filter(node => node.id !== portfolioForm.id)
                          .map(node => (
                            <option key={node.id} value={node.id}>
                              {node.id} ({node.title})
                            </option>
                          ))}
                      </select>
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">Node Flow Type</label>
                      <select
                        className="form-select"
                        value={portfolioForm.type}
                        onChange={e => setPortfolioForm({ ...portfolioForm, type: e.target.value as any })}
                      >
                        <option value="root">Root Node (BLINX HQ)</option>
                        <option value="service">Service Category (Photography/Video)</option>
                        <option value="client">Client Node (Nova Fashion)</option>
                        <option value="work">Deliverable / Work Node (Case Studies)</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label className="form-label">Display Color Theme</label>
                      <select
                        className="form-select"
                        value={portfolioForm.color}
                        onChange={e => setPortfolioForm({ ...portfolioForm, color: e.target.value })}
                      >
                        <option value="bg-electric-red">Electric Red (Vibrant)</option>
                        <option value="bg-voltage-yellow">Voltage Yellow (Brutal)</option>
                        <option value="bg-ink-black">Ink Black (Minimal)</option>
                        <option value="bg-studio-white">Studio White (Clean)</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">Node Title *</label>
                      <input
                        type="text"
                        className="form-input"
                        value={portfolioForm.title}
                        onChange={e => setPortfolioForm({ ...portfolioForm, title: e.target.value })}
                        placeholder="e.g. Campaign Retainer"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Node Subtitle</label>
                      <input
                        type="text"
                        className="form-input"
                        value={portfolioForm.subtitle}
                        onChange={e => setPortfolioForm({ ...portfolioForm, subtitle: e.target.value })}
                        placeholder="e.g. 15 Deliverables"
                      />
                    </div>
                  </div>

                  {/* Chips/Tags Array */}
                  <div style={{ marginTop: "1.5rem" }}>
                    <label className="form-label" style={{ display: "block", marginBottom: "0.5rem" }}>
                      Flowchart Tag Chips
                    </label>
                    {portfolioForm.chips?.map((chip, index) => (
                      <div key={index} className="dynamic-list-row">
                        <input
                          type="text"
                          className="form-input"
                          style={{ flex: 1 }}
                          value={chip}
                          onChange={e => handleChipChange(index, e.target.value)}
                          placeholder="e.g. Viral, TikTok"
                        />
                        <button
                          type="button"
                          className="dynamic-list-btn"
                          onClick={() => removeChip(index)}
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      className="dynamic-list-btn add-btn"
                      onClick={addChip}
                    >
                      + Add Tag Chip
                    </button>
                  </div>

                  {/* Metrics Array */}
                  <div style={{ marginTop: "1.5rem" }}>
                    <label className="form-label" style={{ display: "block", marginBottom: "0.5rem" }}>
                      Performance Metrics (Shows inside Node detail drawer)
                    </label>
                    {portfolioForm.metrics?.map((metric, index) => (
                      <div key={index} className="dynamic-list-row">
                        <input
                          type="text"
                          className="form-input"
                          style={{ flex: 1 }}
                          value={metric.label}
                          onChange={e => handlePortfolioMetricChange(index, "label", e.target.value)}
                          placeholder="Label (e.g. ROI)"
                        />
                        <input
                          type="text"
                          className="form-input"
                          style={{ flex: 1 }}
                          value={metric.value}
                          onChange={e => handlePortfolioMetricChange(index, "value", e.target.value)}
                          placeholder="Value (e.g. 8.2x)"
                        />
                        <button
                          type="button"
                          className="dynamic-list-btn"
                          onClick={() => removePortfolioMetric(index)}
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      className="dynamic-list-btn add-btn"
                      onClick={addPortfolioMetric}
                    >
                      + Add Node Metric
                    </button>
                  </div>

                  {/* Case Study Details - Only for Work type nodes */}
                  {portfolioForm.type === "work" && (
                    <div style={{ marginTop: "2rem", borderTop: "2px dashed #333", paddingTop: "1.5rem" }}>
                      <h3 className="form-label" style={{ color: "var(--voltage-yellow)", marginBottom: "1rem" }}>
                        Case Study Detail Page Rich Content
                      </h3>
                      <div className="form-group">
                        <label className="form-label">Brief Description (Supports Paragraphs)</label>
                        <textarea
                          className="form-textarea"
                          value={portfolioForm.caseStudy?.description || ""}
                          onChange={e => setPortfolioForm({
                            ...portfolioForm,
                            caseStudy: {
                              media: portfolioForm.caseStudy?.media || [],
                              description: e.target.value
                            }
                          })}
                          placeholder="Enter rich paragraphs detailing results, challenges, creative processes..."
                        ></textarea>
                      </div>

                      {/* Media Image/Video Url List */}
                      <div>
                        <label className="form-label" style={{ display: "block", marginBottom: "0.5rem" }}>
                          Case Study Media Showcase URLs (Images or Video embeds)
                        </label>
                        {portfolioForm.caseStudy?.media.map((url, index) => (
                          <div key={index} className="dynamic-list-row">
                            <input
                              type="text"
                              className="form-input font-mono text-sm"
                              style={{ flex: 1 }}
                              value={url}
                              onChange={e => handleMediaChange(index, e.target.value)}
                              placeholder="Image or Video URL (e.g. https://domain.com/hero.jpg)"
                            />
                            <button
                              type="button"
                              className="dynamic-list-btn"
                              onClick={() => removeMediaUrl(index)}
                            >
                              Remove
                            </button>
                          </div>
                        ))}
                        <button
                          type="button"
                          className="dynamic-list-btn add-btn"
                          onClick={addMediaUrl}
                        >
                          + Add Media Asset URL
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* 3. TEAM MEMBERS FORM SECTION */}
              {editItemType === "team" && (
                <div>
                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">Member unique ID *</label>
                      <input
                        type="text"
                        className="form-input font-mono"
                        value={teamForm.id}
                        onChange={e => setTeamForm({ ...teamForm, id: e.target.value })}
                        disabled={editMode}
                        placeholder="e.g., team-5"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Member Name *</label>
                      <input
                        type="text"
                        className="form-input"
                        value={teamForm.name}
                        onChange={e => setTeamForm({ ...teamForm, name: e.target.value })}
                        placeholder="e.g. Alex Mercer"
                        required
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">Role Title</label>
                      <input
                        type="text"
                        className="form-input"
                        value={teamForm.role}
                        onChange={e => setTeamForm({ ...teamForm, role: e.target.value })}
                        placeholder="e.g. Retexture Artist"
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Specialty Matrix Focus</label>
                      <input
                        type="text"
                        className="form-input"
                        value={teamForm.specialty}
                        onChange={e => setTeamForm({ ...teamForm, specialty: e.target.value })}
                        placeholder="e.g. Algorithm Infiltration"
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Matrix Theme Color</label>
                    <select
                      className="form-select"
                      value={teamForm.color}
                      onChange={e => setTeamForm({ ...teamForm, color: e.target.value })}
                    >
                      <option value="bg-electric-red">Electric Red (Vibrant)</option>
                      <option value="bg-voltage-yellow">Voltage Yellow (Brutal)</option>
                      <option value="bg-ink-black">Ink Black (Minimal)</option>
                      <option value="bg-studio-white">Studio White (Clean)</option>
                    </select>
                  </div>

                  <div className="form-group" style={{ marginTop: "1rem" }}>
                    <label className="form-label">Background Photo URL</label>
                    <input
                      type="text"
                      className="form-input"
                      value={teamForm.photo || ""}
                      onChange={e => setTeamForm({ ...teamForm, photo: e.target.value })}
                      placeholder="e.g. https://images.unsplash.com/... or /public folder path"
                    />
                  </div>
                </div>
              )}

              {/* Modal controls */}
              <div className="modal-actions">
                <button
                  type="button"
                  className="action-btn secondary"
                  onClick={() => setModalOpen(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="action-btn">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
    </>
  );
}
