"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AdminLogin() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
      const res = await fetch(`${API_URL}/admin/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        router.push("/admin");
      } else {
        setError(data.error || "Invalid credentials");
      }
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Navigation */}
      <nav className="navbar" id="login-navbar">
        <Link href="/" className="navbar-logo">
          <div className="navbar-logo-icon">E</div>
          <span className="navbar-logo-text">EventHub</span>
        </Link>
        <ul className="navbar-links">
          <li><Link href="/">Home</Link></li>
          <li><Link href="/#events">Events</Link></li>
        </ul>
        <Link href="/#events" className="navbar-cta">
          Register Now →
        </Link>
      </nav>

      <div className="register-page" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ width: '100%', maxWidth: 440 }}>
          {/* Header */}
          <div className="register-header">
            <div style={{
              width: 72,
              height: 72,
              background: 'rgba(139, 92, 246, 0.1)',
              border: '1px solid rgba(139, 92, 246, 0.2)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 32,
              margin: '0 auto 20px',
            }}>
              🔐
            </div>
            <h1 className="register-title" style={{ fontSize: 28 }}>Admin Login</h1>
            <p className="register-subtitle">
              Enter your credentials to access the dashboard
            </p>
          </div>

          {/* Login Form */}
          <div className="form-card">
            <form onSubmit={handleSubmit}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                {/* Username */}
                <div className="form-group">
                  <label className="form-label" htmlFor="username">
                    👤 Username
                  </label>
                  <input
                    type="text"
                    id="username"
                    className="form-input"
                    placeholder="Enter admin username"
                    value={username}
                    onChange={(e) => { setUsername(e.target.value); setError(""); }}
                    required
                    autoFocus
                  />
                </div>

                {/* Password */}
                <div className="form-group">
                  <label className="form-label" htmlFor="password">
                    🔑 Password
                  </label>
                  <div style={{ position: 'relative' }}>
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      className="form-input"
                      placeholder="Enter admin password"
                      value={password}
                      onChange={(e) => { setPassword(e.target.value); setError(""); }}
                      required
                      style={{ paddingRight: 48 }}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      style={{
                        position: 'absolute',
                        right: 12,
                        top: '50%',
                        transform: 'translateY(-50%)',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        fontSize: 18,
                        padding: 4,
                      }}
                      tabIndex={-1}
                    >
                      {showPassword ? '🙈' : '👁️'}
                    </button>
                  </div>
                </div>

                {/* Error */}
                {error && (
                  <div style={{
                    padding: '12px 16px',
                    background: 'rgba(239, 68, 68, 0.1)',
                    border: '1px solid rgba(239, 68, 68, 0.3)',
                    borderRadius: 'var(--radius-md)',
                    color: '#ef4444',
                    fontSize: 14,
                    fontWeight: 500,
                    textAlign: 'center',
                  }}>
                    ⚠️ {error}
                  </div>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  className="submit-btn"
                  disabled={loading}
                  id="admin-login-btn"
                >
                  {loading ? (
                    <>
                      <div className="spinner"></div>
                      Authenticating...
                    </>
                  ) : (
                    <>🔓 Login to Dashboard</>
                  )}
                </button>

                {/* Back link */}
                <div style={{ textAlign: 'center', marginTop: 4 }}>
                  <Link href="/" style={{
                    color: 'var(--text-muted)',
                    textDecoration: 'none',
                    fontSize: 14,
                    transition: 'color 0.3s',
                  }}>
                    ← Back to Home
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
