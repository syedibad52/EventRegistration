import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import { 
  insertRegistration, 
  getAllRegistrations, 
  getRegistrationCount, 
  getEventCounts,
  deleteRegistration 
} from './db.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
const allowedOrigins = [
  process.env.FRONTEND_URL || 'http://localhost:3000',
  'http://localhost:3001'
];
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

// Registration Routes
app.post('/api/register', (req, res) => {
  try {
    const data = req.body;
    const required = ['full_name', 'usn', 'email', 'phone', 'branch', 'semester', 'gender', 'event_name', 'event_type'];
    for (const field of required) {
      if (!data[field]) {
        return res.status(400).json({ error: `Missing required field: ${field}` });
      }
    }

    const result = insertRegistration(data);
    res.status(201).json({ 
      success: true, 
      message: 'Registration successful!',
      id: result.lastInsertRowid 
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Failed to register. Please try again.' });
  }
});

// Admin Auth Routes
app.post('/api/admin/login', (req, res) => {
  const { username, password } = req.body;
  if (username === process.env.ADMIN_USERNAME && password === process.env.ADMIN_PASSWORD) {
    res.cookie('admin_session', 'authenticated', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 4 * 60 * 60 * 1000, // 4 hours
      path: '/'
    });
    return res.json({ success: true, message: 'Login successful' });
  }
  res.status(401).json({ success: false, error: 'Invalid username or password' });
});

app.get('/api/admin/verify', (req, res) => {
  const session = req.cookies.admin_session;
  if (session === 'authenticated') {
    return res.json({ authenticated: true });
  }
  res.status(401).json({ authenticated: false });
});

app.post('/api/admin/logout', (req, res) => {
  res.cookie('admin_session', '', { httpOnly: true, maxAge: 0, path: '/' });
  res.json({ success: true, message: 'Logged out' });
});

// Admin Data Routes (protected)
app.get('/api/registrations', (req, res) => {
  const session = req.cookies.admin_session;
  if (session !== 'authenticated') {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const { view } = req.query;
    if (view === 'stats') {
      const total = getRegistrationCount();
      const eventCounts = getEventCounts();
      return res.json({ total, eventCounts });
    }

    const registrations = getAllRegistrations();
    res.json({ registrations });
  } catch (error) {
    console.error('Fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch registrations.' });
  }
});

app.delete('/api/registrations/:id', (req, res) => {
  const session = req.cookies.admin_session;
  if (session !== 'authenticated') {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const id = req.params.id;
    deleteRegistration(id);
    res.json({ success: true, message: 'Registration deleted' });
  } catch (error) {
    console.error('Delete error:', error);
    res.status(500).json({ error: 'Failed to delete registration.' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
});
