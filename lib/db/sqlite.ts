import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';

const dbPath = path.join(process.cwd(), 'frigya.db');
const db = new Database(dbPath);

// Enable foreign keys
db.pragma('foreign_keys = ON');

// Initialize database with tables if they don't exist
export function initializeDatabase() {
  // Create users table
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE NOT NULL,
      first_name TEXT,
      last_name TEXT,
      phone TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Create registrations table
  db.exec(`
    CREATE TABLE IF NOT EXISTS registrations (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      experience_level TEXT CHECK(experience_level IN ('beginner', 'intermediate', 'advanced', 'expert')) NOT NULL,
      preferred_dates TEXT,
      group_size INTEGER NOT NULL,
      motivation TEXT,
      status TEXT CHECK(status IN ('pending', 'approved', 'rejected', 'cancelled')) DEFAULT 'pending',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id)
    )
  `);

  // Create routes table
  db.exec(`
    CREATE TABLE IF NOT EXISTS routes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      description TEXT,
      distance_km REAL NOT NULL,
      difficulty TEXT CHECK(difficulty IN ('easy', 'moderate', 'hard', 'expert')) NOT NULL,
      gpx_data TEXT,
      markers TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Create analytics table
  db.exec(`
    CREATE TABLE IF NOT EXISTS analytics (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      event_type TEXT NOT NULL,
      event_data TEXT,
      user_id INTEGER,
      session_id TEXT,
      ip_address TEXT,
      user_agent TEXT,
      referrer TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id)
    )
  `);

  // Create indexes
  db.exec(`
    CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
    CREATE INDEX IF NOT EXISTS idx_registrations_user_id ON registrations(user_id);
    CREATE INDEX IF NOT EXISTS idx_registrations_status ON registrations(status);
    CREATE INDEX IF NOT EXISTS idx_routes_difficulty ON routes(difficulty);
    CREATE INDEX IF NOT EXISTS idx_analytics_event_type ON analytics(event_type);
    CREATE INDEX IF NOT EXISTS idx_analytics_user_id ON analytics(user_id);
    CREATE INDEX IF NOT EXISTS idx_analytics_session_id ON analytics(session_id);
  `);

  console.log('Database initialized successfully');
}

// Initialize on import
initializeDatabase();

export default db;