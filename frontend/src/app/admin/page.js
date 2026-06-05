"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AdminDashboard() {
  const router = useRouter();
  const [registrations, setRegistrations] = useState([]);
  const [stats, setStats] = useState({ total: 0, eventCounts: [] });
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const [authChecking, setAuthChecking] = useState(true);

  // Check authentication on mount
  useEffect(() => {
    const verifyAuth = async () => {
      try {
        const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
        const res = await fetch(`${API_URL}/admin/verify`, { credentials: "include" });
        const data = await res.json();
        if (data.authenticated) {
          setAuthenticated(true);
          fetchData();
        } else {
          router.push("/admin/login");
        }
      } catch (err) {
        router.push("/admin/login");
      } finally {
        setAuthChecking(false);
      }
    };
    verifyAuth();
  }, [router]);

  const fetchData = async () => {
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
      const [regRes, statsRes] = await Promise.all([
        fetch(`${API_URL}/registrations`, { credentials: "include" }),
        fetch(`${API_URL}/registrations?view=stats`, { credentials: "include" }),
      ]);
      const regData = await regRes.json();
      const statsData = await statsRes.json();
      setRegistrations(regData.registrations || []);
      setStats(statsData);
    } catch (err) {
      console.error("Failed to fetch:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
      await fetch(`${API_URL}/admin/logout`, { method: "POST", credentials: "include" });
      router.push("/admin/login");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  const filtered = registrations.filter(
    (r) =>
      r.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.usn?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.event_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.branch?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const eventColorMap = {
    Hackathon: "#8b5cf6",
    Sports: "#3b82f6",
    Dance: "#ec4899",
    Workshop: "#10b981",
    Seminar: "#f97316",
    "Coding Contest": "#06b6d4",
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this registration?")) return;
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
      const res = await fetch(`${API_URL}/registrations/${id}`, {
        method: "DELETE",
        credentials: "include"
      });
      if (res.ok) {
        fetchData(); // Refresh data after deletion
      }
    } catch (err) {
      console.error("Failed to delete:", err);
    }
  };

  // Show loading while checking auth
  if (authChecking) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: 16,
      }}>
        <div className="spinner" style={{
          width: 48,
          height: 48,
          border: '3px solid rgba(139,92,246,0.2)',
          borderTopColor: '#8b5cf6',
          borderRadius: '50%',
          animation: 'spin 0.6s linear infinite',
        }}></div>
        <p style={{ color: 'var(--text-muted)', fontSize: 14 }}>Verifying access...</p>
      </div>
    );
  }

  if (!authenticated) return null;

  return (
    <>
      {/* Navigation */}
      <nav className="navbar" id="admin-navbar">
        <Link href="/" className="navbar-logo">
          <div className="navbar-logo-icon">E</div>
          <span className="navbar-logo-text">EventHub</span>
        </Link>
        <ul className="navbar-links">
          <li><Link href="/">Home</Link></li>
          <li><Link href="/#events">Events</Link></li>
          <li><Link href="/admin" style={{ color: 'var(--accent-purple)' }}>Dashboard</Link></li>
        </ul>
        <button
          onClick={handleLogout}
          className="navbar-cta"
          id="admin-logout-btn"
          style={{
            background: 'linear-gradient(135deg, #ef4444, #f97316)',
            boxShadow: '0 4px 15px rgba(239, 68, 68, 0.3)',
          }}
        >
          🚪 Logout
        </button>
      </nav>

      <div className="admin-page">
        <div className="admin-container">
          {/* Header */}
          <div className="section-header" style={{ marginBottom: 40 }}>
            <div className="section-label">📊 Admin Panel</div>
            <h1 className="section-title">Registration Dashboard</h1>
            <p className="section-subtitle">
              Track and manage all event registrations
            </p>
          </div>

          {/* Stats Cards */}
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-card-label">Total Registrations</div>
              <div className="stat-card-value">{stats.total}</div>
            </div>
            {stats.eventCounts?.map((ec) => (
              <div className="stat-card" key={ec.event_name}>
                <div className="stat-card-label">{ec.event_name}</div>
                <div className="stat-card-value">{ec.count}</div>
              </div>
            ))}
          </div>

          {/* Registrations Table */}
          <div className="table-card">
            <div className="table-header">
              <h2 className="table-title">All Registrations</h2>
              <input
                type="text"
                className="table-search"
                placeholder="🔍 Search by name, USN, event, branch..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                id="search-registrations"
              />
            </div>

            {loading ? (
              <div className="table-empty">
                <div className="spinner" style={{
                  width: 40,
                  height: 40,
                  border: '3px solid rgba(139,92,246,0.2)',
                  borderTopColor: '#8b5cf6',
                  borderRadius: '50%',
                  animation: 'spin 0.6s linear infinite',
                  margin: '0 auto 16px',
                }}></div>
                Loading registrations...
              </div>
            ) : filtered.length === 0 ? (
              <div className="table-empty">
                <div className="table-empty-icon">📭</div>
                <p>No registrations found</p>
                <p style={{ fontSize: 14, marginTop: 8, color: 'var(--text-muted)' }}>
                  Registrations will appear here once students register for events
                </p>
              </div>
            ) : (
              <div className="table-wrapper">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Name</th>
                      <th>USN</th>
                      <th>Email</th>
                      <th>Phone</th>
                      <th>Branch</th>
                      <th>Sem</th>
                      <th>Gender</th>
                      <th>Event</th>
                      <th>Registered At</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((r, idx) => (
                      <tr key={r.id}>
                        <td style={{ color: 'var(--text-muted)' }}>{idx + 1}</td>
                        <td style={{ fontWeight: 600 }}>{r.full_name}</td>
                        <td><code style={{
                          background: 'rgba(139,92,246,0.1)',
                          padding: '2px 8px',
                          borderRadius: 4,
                          fontSize: 13,
                          color: 'var(--accent-purple)',
                        }}>{r.usn}</code></td>
                        <td style={{ color: 'var(--text-secondary)' }}>{r.email}</td>
                        <td style={{ color: 'var(--text-secondary)' }}>{r.phone}</td>
                        <td style={{ color: 'var(--text-secondary)', fontSize: 13 }}>{r.branch}</td>
                        <td>{r.semester}</td>
                        <td>{r.gender}</td>
                        <td>
                          <span
                            className="table-event-tag"
                            style={{
                              background: `${eventColorMap[r.event_type] || '#8b5cf6'}22`,
                              color: eventColorMap[r.event_type] || '#8b5cf6',
                            }}
                          >
                            {r.event_name}
                          </span>
                        </td>
                        <td style={{ color: 'var(--text-muted)', fontSize: 13 }}>
                          {r.created_at ? new Date(r.created_at).toLocaleDateString('en-IN', {
                            day: '2-digit',
                            month: 'short',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                          }) : 'N/A'}
                        </td>
                        <td>
                          <button
                            onClick={() => handleDelete(r.id)}
                            style={{
                              background: 'rgba(239, 68, 68, 0.1)',
                              border: '1px solid rgba(239, 68, 68, 0.3)',
                              color: '#ef4444',
                              padding: '4px 8px',
                              borderRadius: '4px',
                              cursor: 'pointer',
                              fontSize: '13px'
                            }}
                            title="Delete Participant"
                          >
                            🗑️
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="footer">
        <p className="footer-text">
          © 2026 <a href="/">EventHub</a> — Admin Dashboard
        </p>
      </footer>
    </>
  );
}
