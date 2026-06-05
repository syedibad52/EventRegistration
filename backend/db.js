import Database from 'better-sqlite3';
import path from 'path';

let db;

function getDb() {
  if (!db) {
    const dbPath = path.join(process.cwd(), 'event_registration.db');
    db = new Database(dbPath);
    db.pragma('journal_mode = WAL');
    
    // Create registrations table
    db.exec(`
      CREATE TABLE IF NOT EXISTS registrations (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        full_name TEXT NOT NULL,
        usn TEXT NOT NULL,
        email TEXT NOT NULL,
        phone TEXT NOT NULL,
        branch TEXT NOT NULL,
        semester TEXT NOT NULL,
        gender TEXT NOT NULL,
        event_name TEXT NOT NULL,
        event_type TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);
  }
  return db;
}

export function insertRegistration(data) {
  const database = getDb();
  const stmt = database.prepare(`
    INSERT INTO registrations (full_name, usn, email, phone, branch, semester, gender, event_name, event_type)
    VALUES (@full_name, @usn, @email, @phone, @branch, @semester, @gender, @event_name, @event_type)
  `);
  const result = stmt.run(data);
  return result;
}

export function getAllRegistrations() {
  const database = getDb();
  const stmt = database.prepare('SELECT * FROM registrations ORDER BY created_at DESC');
  return stmt.all();
}

export function getRegistrationsByEvent(eventName) {
  const database = getDb();
  const stmt = database.prepare('SELECT * FROM registrations WHERE event_name = ? ORDER BY created_at DESC');
  return stmt.all(eventName);
}

export function getRegistrationCount() {
  const database = getDb();
  const stmt = database.prepare('SELECT COUNT(*) as count FROM registrations');
  return stmt.get().count;
}

export function getEventCounts() {
  const database = getDb();
  const stmt = database.prepare('SELECT event_name, COUNT(*) as count FROM registrations GROUP BY event_name');
  return stmt.all();
}

export function deleteRegistration(id) {
  const database = getDb();
  const stmt = database.prepare('DELETE FROM registrations WHERE id = ?');
  return stmt.run(id);
}
