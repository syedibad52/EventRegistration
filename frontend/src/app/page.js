"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

const events = [
  {
    id: "hackathon",
    title: "CodeStorm Hackathon",
    type: "Hackathon",
    icon: "💻",
    color: "purple",
    desc: "48-hour coding marathon to build innovative solutions. Team up, code, and compete for exciting prizes!",
    date: "Jul 15-16, 2026",
    seats: "200 seats",
  },
  {
    id: "sports",
    title: "Thunder Sports Fest",
    type: "Sports",
    icon: "🏆",
    color: "blue",
    desc: "Compete in cricket, football, basketball, and athletics. Showcase your sportsmanship and win glory!",
    date: "Jul 22-24, 2026",
    seats: "500 seats",
  },
  {
    id: "dance",
    title: "Rhythm & Grooves",
    type: "Dance",
    icon: "💃",
    color: "pink",
    desc: "Solo, duet, and group dance competitions across all genres. Let the stage be your canvas!",
    date: "Aug 5, 2026",
    seats: "150 seats",
  },
  {
    id: "workshop",
    title: "AI & ML Workshop",
    type: "Workshop",
    icon: "🤖",
    color: "green",
    desc: "Hands-on workshop on Artificial Intelligence & Machine Learning with industry experts.",
    date: "Aug 12, 2026",
    seats: "100 seats",
  },
  {
    id: "seminar",
    title: "TechTalks Seminar",
    type: "Seminar",
    icon: "🎤",
    color: "orange",
    desc: "Inspiring talks from industry leaders on emerging technologies, career growth, and innovation.",
    date: "Aug 18, 2026",
    seats: "300 seats",
  },
  {
    id: "coding",
    title: "Code Sprint Challenge",
    type: "Coding Contest",
    icon: "⚡",
    color: "cyan",
    desc: "Competitive programming contest with algorithmic challenges. Race against the clock to solve problems!",
    date: "Aug 25, 2026",
    seats: "250 seats",
  },
];

function Particles() {
  return (
    <div className="particles">
      {Array.from({ length: 30 }).map((_, i) => (
        <div
          key={i}
          className="particle"
          style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 15}s`,
            animationDuration: `${10 + Math.random() * 20}s`,
          }}
        />
      ))}
    </div>
  );
}

export default function Home() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <>
      <Particles />

      {/* Navigation */}
      <nav className="navbar" id="main-navbar">
        <Link href="/" className="navbar-logo">
          <div className="navbar-logo-icon">E</div>
          <span className="navbar-logo-text">EventHub</span>
        </Link>
        <ul className="navbar-links">
          <li><a href="#events">Events</a></li>
          <li><a href="#about">About</a></li>
          <li><Link href="/admin/login">Dashboard</Link></li>
        </ul>
        <Link href="#events" className="navbar-cta">
          Register Now →
        </Link>
      </nav>

      {/* Hero Section */}
      <section className="hero" id="hero">
        <div className="hero-badge">
          <span className="hero-badge-dot"></span>
          Registrations Open for 2026
        </div>
        <h1>
          Discover & Register for
          <br />
          <span className="gradient-text">Campus Events</span>
        </h1>
        <p className="hero-subtitle">
          From hackathons to dance competitions — explore exciting events, 
          register in seconds, and be part of something extraordinary.
        </p>
        <div className="hero-buttons">
          <a href="#events" className="btn-primary">
            🎯 Explore Events
          </a>
          <Link href="/admin/login" className="btn-secondary">
            📊 Admin Panel
          </Link>
        </div>
        <div className="hero-stats">
          <div className="hero-stat">
            <div className="hero-stat-number">6+</div>
            <div className="hero-stat-label">Events</div>
          </div>
          <div className="hero-stat">
            <div className="hero-stat-number">1500+</div>
            <div className="hero-stat-label">Seats</div>
          </div>
          <div className="hero-stat">
            <div className="hero-stat-number">10+</div>
            <div className="hero-stat-label">Departments</div>
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section className="section" id="events">
        <div className="section-header">
          <div className="section-label">🔥 Upcoming Events</div>
          <h2 className="section-title">Choose Your Event</h2>
          <p className="section-subtitle">
            Select an event to register and secure your spot today
          </p>
        </div>
        <div className="events-grid">
          {events.map((event, index) => (
            <div
              key={event.id}
              className="event-card"
              data-color={event.color}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="event-card-icon">{event.icon}</div>
              <h3 className="event-card-title">{event.title}</h3>
              <p className="event-card-desc">{event.desc}</p>
              <div className="event-card-meta">
                <span className="event-card-date">📅 {event.date}</span>
                <span className="event-card-tag">{event.type}</span>
              </div>
              <Link
                href={`/register?event=${event.id}&name=${encodeURIComponent(event.title)}&type=${encodeURIComponent(event.type)}`}
                className="event-card-register"
              >
                Register Now →
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* About Section */}
      <section className="section" id="about" style={{ maxWidth: 800, margin: '0 auto' }}>
        <div className="section-header">
          <div className="section-label">ℹ️ About</div>
          <h2 className="section-title">About EventHub</h2>
          <p className="section-subtitle" style={{ maxWidth: 600 }}>
            EventHub is a modern college event registration platform built to simplify 
            event management. Students can browse events, register with their details, 
            and administrators can track all registrations from a beautiful dashboard.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p className="footer-text">
          © 2026 <a href="/">EventHub</a> — College Event Registration Platform. Built with ❤️
        </p>
      </footer>
    </>
  );
}
