"use client";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

const branches = [
  "Computer Science & Engineering",
  "Information Science & Engineering",
  "Electronics & Communication",
  "Electrical & Electronics",
  "Mechanical Engineering",
  "Civil Engineering",
  "Artificial Intelligence & ML",
  "Data Science",
  "Biotechnology",
  "Chemical Engineering",
];

const semesters = ["1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th"];

export default function RegisterForm() {
  const searchParams = useSearchParams();
  const eventId = searchParams.get("event") || "";
  const eventName = searchParams.get("name") || "Event";
  const eventType = searchParams.get("type") || "Event";

  const [formData, setFormData] = useState({
    full_name: "",
    usn: "",
    email: "",
    phone: "",
    branch: "",
    semester: "",
    gender: "",
    event_name: eventName,
    event_type: eventType,
  });

  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleGenderChange = (gender) => {
    setFormData({ ...formData, gender });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
      const res = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setShowModal(true);
      } else {
        setError(data.error || "Registration failed. Please try again.");
      }
    } catch (err) {
      setError("Network error. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Navigation */}
      <nav className="navbar" id="register-navbar">
        <Link href="/" className="navbar-logo">
          <img src="/logo.png" alt="EventHub Logo" style={{ width: 40, height: 40, borderRadius: 8, objectFit: 'cover' }} />
          <span className="navbar-logo-text">EventHub</span>
        </Link>
        <ul className="navbar-links">
          <li><Link href="/">Home</Link></li>
          <li><Link href="/#events">Events</Link></li>
          <li><Link href="/admin">Dashboard</Link></li>
        </ul>
        <Link href="/" className="navbar-cta">
          ← Back to Events
        </Link>
      </nav>

      <div className="register-page">
        <div className="register-container">
          {/* Header */}
          <div className="register-header">
            <div className="register-event-badge">
              🎯 {eventType}
            </div>
            <h1 className="register-title">
              Register for <span className="gradient-text">{eventName}</span>
            </h1>
            <p className="register-subtitle">
              Fill in your details below to secure your spot
            </p>
          </div>

          {/* Form */}
          <div className="form-card">
            <form onSubmit={handleSubmit}>
              <div className="form-grid">
                {/* Full Name */}
                <div className="form-group">
                  <label className="form-label" htmlFor="full_name">
                    👤 Full Name <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    id="full_name"
                    name="full_name"
                    className="form-input"
                    placeholder="Enter your full name"
                    value={formData.full_name}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* USN */}
                <div className="form-group">
                  <label className="form-label" htmlFor="usn">
                    🆔 USN <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    id="usn"
                    name="usn"
                    className="form-input"
                    placeholder="e.g. 1XX22CS001"
                    value={formData.usn}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Email */}
                <div className="form-group">
                  <label className="form-label" htmlFor="email">
                    📧 Email <span className="required">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="form-input"
                    placeholder="your.email@college.edu"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Phone */}
                <div className="form-group">
                  <label className="form-label" htmlFor="phone">
                    📱 Phone Number <span className="required">*</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    className="form-input"
                    placeholder="Enter phone number"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Branch - Spinner/Dropdown */}
                <div className="form-group">
                  <label className="form-label" htmlFor="branch">
                    🏛️ Branch / Department <span className="required">*</span>
                  </label>
                  <select
                    id="branch"
                    name="branch"
                    className="form-select"
                    value={formData.branch}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Department</option>
                    {branches.map((b) => (
                      <option key={b} value={b}>{b}</option>
                    ))}
                  </select>
                </div>

                {/* Semester */}
                <div className="form-group">
                  <label className="form-label" htmlFor="semester">
                    📚 Semester <span className="required">*</span>
                  </label>
                  <select
                    id="semester"
                    name="semester"
                    className="form-select"
                    value={formData.semester}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Semester</option>
                    {semesters.map((s) => (
                      <option key={s} value={s}>{s} Semester</option>
                    ))}
                  </select>
                </div>

                {/* Gender - Radio Buttons */}
                <div className="form-group full-width">
                  <label className="form-label">
                    🧑 Gender <span className="required">*</span>
                  </label>
                  <div className="radio-group">
                    {["Male", "Female", "Other"].map((g) => (
                      <label
                        key={g}
                        className={`radio-option ${formData.gender === g ? "selected" : ""}`}
                        onClick={() => handleGenderChange(g)}
                      >
                        <input
                          type="radio"
                          name="gender"
                          value={g}
                          checked={formData.gender === g}
                          onChange={() => handleGenderChange(g)}
                        />
                        <span className="radio-custom"></span>
                        <span className="radio-label">{g}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Error Message */}
                {error && (
                  <div className="form-group full-width" style={{
                    padding: '12px 16px',
                    background: 'rgba(239, 68, 68, 0.1)',
                    border: '1px solid rgba(239, 68, 68, 0.3)',
                    borderRadius: 'var(--radius-md)',
                    color: '#ef4444',
                    fontSize: '14px',
                    fontWeight: 500,
                  }}>
                    ⚠️ {error}
                  </div>
                )}

                {/* Submit */}
                <div className="form-submit">
                  <button
                    type="submit"
                    className="submit-btn"
                    disabled={loading}
                    id="submit-registration"
                  >
                    {loading ? (
                      <>
                        <div className="spinner"></div>
                        Registering...
                      </>
                    ) : (
                      <>🚀 Submit Registration</>
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-icon">✅</div>
            <h2 className="modal-title">Registration Successful!</h2>
            <p className="modal-message">
              Congratulations! You have been successfully registered for the event. 
              Check your email for confirmation details.
            </p>
            <div className="modal-details">
              <div className="modal-detail-row">
                <span className="modal-detail-label">Name</span>
                <span className="modal-detail-value">{formData.full_name}</span>
              </div>
              <div className="modal-detail-row">
                <span className="modal-detail-label">USN</span>
                <span className="modal-detail-value">{formData.usn}</span>
              </div>
              <div className="modal-detail-row">
                <span className="modal-detail-label">Event</span>
                <span className="modal-detail-value">{eventName}</span>
              </div>
              <div className="modal-detail-row">
                <span className="modal-detail-label">Branch</span>
                <span className="modal-detail-value">{formData.branch}</span>
              </div>
              <div className="modal-detail-row">
                <span className="modal-detail-label">Semester</span>
                <span className="modal-detail-value">{formData.semester}</span>
              </div>
            </div>
            <Link href="/" className="modal-btn">
              ← Back to Home
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
