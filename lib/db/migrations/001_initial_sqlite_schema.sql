-- SQLite Initial Schema for Frigya Registration System
-- Drop existing tables if they exist (for clean migration)
DROP TABLE IF EXISTS analytics;
DROP TABLE IF EXISTS registrations;
DROP TABLE IF EXISTS routes;
DROP TABLE IF EXISTS users;

-- Users table
CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT UNIQUE NOT NULL,
  first_name TEXT,
  last_name TEXT,
  phone TEXT,
  country TEXT,
  age INTEGER CHECK (age >= 18 AND age <= 75),
  emergency_contact TEXT, -- JSON string for emergency contact info
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Create index on email for faster lookups
CREATE UNIQUE INDEX idx_users_email ON users(email);

-- Registrations table with enhanced fields for FRIG-22
CREATE TABLE registrations (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,

  -- Step 1: Interest Capture
  interested_in TEXT CHECK (interested_in IN ('full_trail', 'eastern', 'southern', 'western', 'undecided')),
  timeframe TEXT CHECK (timeframe IN ('next_month', 'next_3_months', 'next_6_months', 'next_year', 'just_exploring')),
  group_type TEXT CHECK (group_type IN ('solo', 'couple', 'friends', 'family', 'organized_group')),

  -- Step 3: Experience Assessment
  fitness_level INTEGER CHECK (fitness_level >= 1 AND fitness_level <= 5),
  hiking_experience TEXT CHECK (hiking_experience IN ('none', 'day_hikes', 'multi_day', 'expert')),
  longest_hike INTEGER CHECK (longest_hike >= 0 AND longest_hike <= 1000),
  medical_conditions TEXT, -- JSON array
  dietary_requirements TEXT, -- JSON array
  special_needs TEXT,

  -- Step 4: Motivation & Commitment
  motivation TEXT,
  goals TEXT, -- JSON array
  how_did_you_hear TEXT,
  newsletter BOOLEAN DEFAULT FALSE,
  terms_accepted BOOLEAN DEFAULT FALSE,
  data_processing BOOLEAN DEFAULT FALSE,

  -- Legacy fields for backward compatibility
  experience_level TEXT CHECK (experience_level IN ('beginner', 'intermediate', 'advanced', 'expert')),
  preferred_dates TEXT, -- JSON array
  group_size INTEGER CHECK (group_size > 0 AND group_size <= 20),

  -- Meta fields
  status TEXT DEFAULT 'pending' CHECK (status IN ('draft', 'pending', 'approved', 'rejected', 'cancelled')),
  step INTEGER DEFAULT 1 CHECK (step >= 1 AND step <= 4),
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for registrations
CREATE INDEX idx_registrations_user_id ON registrations(user_id);
CREATE INDEX idx_registrations_status ON registrations(status);
CREATE INDEX idx_registrations_created_at ON registrations(created_at DESC);
CREATE INDEX idx_registrations_interested_in ON registrations(interested_in);
CREATE INDEX idx_registrations_timeframe ON registrations(timeframe);
CREATE INDEX idx_registrations_fitness_level ON registrations(fitness_level);
CREATE INDEX idx_registrations_step ON registrations(step);

-- Routes table
CREATE TABLE routes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  description TEXT,
  distance_km REAL CHECK (distance_km > 0),
  difficulty TEXT CHECK (difficulty IN ('easy', 'moderate', 'hard', 'expert')),
  gpx_data TEXT, -- JSON string
  markers TEXT, -- JSON string
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for routes
CREATE INDEX idx_routes_difficulty ON routes(difficulty);
CREATE INDEX idx_routes_name ON routes(name);

-- Analytics events table
CREATE TABLE analytics (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  event_type TEXT NOT NULL,
  event_data TEXT, -- JSON string
  user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
  session_id TEXT,
  ip_address TEXT,
  user_agent TEXT,
  referrer TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for analytics
CREATE INDEX idx_analytics_event_type ON analytics(event_type);
CREATE INDEX idx_analytics_created_at ON analytics(created_at DESC);
CREATE INDEX idx_analytics_user_id ON analytics(user_id);
CREATE INDEX idx_analytics_session_id ON analytics(session_id);

-- Create triggers for updated_at columns (SQLite version)
CREATE TRIGGER update_users_updated_at
  AFTER UPDATE ON users
  FOR EACH ROW
  BEGIN
    UPDATE users SET updated_at = CURRENT_TIMESTAMP WHERE id = NEW.id;
  END;

CREATE TRIGGER update_registrations_updated_at
  AFTER UPDATE ON registrations
  FOR EACH ROW
  BEGIN
    UPDATE registrations SET updated_at = CURRENT_TIMESTAMP WHERE id = NEW.id;
  END;

CREATE TRIGGER update_routes_updated_at
  AFTER UPDATE ON routes
  FOR EACH ROW
  BEGIN
    UPDATE routes SET updated_at = CURRENT_TIMESTAMP WHERE id = NEW.id;
  END;

-- Insert initial sample data for testing
INSERT INTO users (email, first_name, last_name, phone, country, age) VALUES
('test@example.com', 'Test', 'User', '+90 555 123 4567', 'Türkiye', 30);

INSERT INTO routes (name, description, distance_km, difficulty) VALUES
('Frigya Yolu - Tam Rota', 'Eskişehir''den Afyon''a kadar tüm Frigya Yolu deneyimi', 300.5, 'hard'),
('Frigya Yolu - Doğu Rotası', 'Eskişehir-Gordion arası tarihi bölge', 120.0, 'moderate'),
('Frigya Yolu - Güney Rotası', 'Afyon çevresi antik kentler', 80.0, 'easy'),
('Frigya Yolu - Batı Rotası', 'Kütahya-Tavşanlı arası doğa yürüyüşü', 60.0, 'easy');