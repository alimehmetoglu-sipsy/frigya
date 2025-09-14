import db from './sqlite';
import {
  User,
  Registration,
  Route,
  AnalyticsEvent,
  CreateUserInput,
  CreateRegistrationInput,
  CreateRouteInput,
  CreateAnalyticsEventInput
} from './types';

// User queries
export async function createUser(input: CreateUserInput): Promise<User> {
  const stmt = db.prepare(`
    INSERT INTO users (email, first_name, last_name, phone, country, age, emergency_contact)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `);

  const result = stmt.run(
    input.email,
    input.first_name,
    input.last_name,
    input.phone,
    input.country,
    input.age,
    input.emergency_contact ? JSON.stringify(input.emergency_contact) : null
  );

  const user = db.prepare('SELECT * FROM users WHERE id = ?').get(result.lastInsertRowid) as User;
  return { ...user, id: user.id.toString() };
}

export async function getUserById(id: string): Promise<User | null> {
  const user = db.prepare('SELECT * FROM users WHERE id = ?').get(parseInt(id)) as User | undefined;
  return user ? { ...user, id: user.id.toString() } : null;
}

export async function getUserByEmail(email: string): Promise<User | null> {
  const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email) as User | undefined;
  return user ? { ...user, id: user.id.toString() } : null;
}

// Registration queries
export async function createRegistration(input: CreateRegistrationInput): Promise<Registration> {
  const stmt = db.prepare(`
    INSERT INTO registrations (
      user_id, interested_in, timeframe, group_type, fitness_level, hiking_experience,
      longest_hike, medical_conditions, dietary_requirements, special_needs,
      motivation, goals, how_did_you_hear, newsletter, terms_accepted, data_processing,
      experience_level, preferred_dates, group_size, status, step
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  const result = stmt.run(
    parseInt(input.user_id),
    input.interested_in,
    input.timeframe,
    input.group_type,
    input.fitness_level,
    input.hiking_experience,
    input.longest_hike,
    input.medical_conditions ? JSON.stringify(input.medical_conditions) : null,
    input.dietary_requirements ? JSON.stringify(input.dietary_requirements) : null,
    input.special_needs,
    input.motivation,
    input.goals ? JSON.stringify(input.goals) : null,
    input.how_did_you_hear,
    input.newsletter ? 1 : 0,
    input.terms_accepted ? 1 : 0,
    input.data_processing ? 1 : 0,
    input.experience_level,
    input.preferred_dates ? JSON.stringify(input.preferred_dates) : null,
    input.group_size,
    input.status || 'pending',
    input.step || 4
  );

  const registration = db.prepare('SELECT * FROM registrations WHERE id = ?').get(result.lastInsertRowid) as Registration;
  return {
    ...registration,
    id: registration.id.toString(),
    user_id: registration.user_id.toString(),
    status: registration.status || 'pending'
  };
}

export async function getRegistrationById(id: string): Promise<Registration | null> {
  const registration = db.prepare('SELECT * FROM registrations WHERE id = ?').get(parseInt(id)) as Registration | undefined;
  return registration ? {
    ...registration,
    id: registration.id.toString(),
    user_id: registration.user_id.toString()
  } : null;
}

// Route queries
export async function createRoute(input: CreateRouteInput): Promise<Route> {
  const stmt = db.prepare(`
    INSERT INTO routes (name, description, distance_km, difficulty, gpx_data, markers)
    VALUES (?, ?, ?, ?, ?, ?)
  `);

  const result = stmt.run(
    input.name,
    input.description,
    input.distance_km,
    input.difficulty,
    JSON.stringify(input.gpx_data),
    JSON.stringify(input.markers)
  );

  const route = db.prepare('SELECT * FROM routes WHERE id = ?').get(result.lastInsertRowid) as Route;
  return { ...route, id: route.id.toString() };
}

export async function getRouteById(id: string): Promise<Route | null> {
  const route = db.prepare('SELECT * FROM routes WHERE id = ?').get(parseInt(id)) as Route | undefined;
  return route ? { ...route, id: route.id.toString() } : null;
}

export async function getAllRoutes(): Promise<Route[]> {
  const routes = db.prepare('SELECT * FROM routes ORDER BY name').all() as Route[];
  return routes.map(route => ({ ...route, id: route.id.toString() }));
}

// Analytics queries
export async function createAnalyticsEvent(input: CreateAnalyticsEventInput): Promise<AnalyticsEvent> {
  const stmt = db.prepare(`
    INSERT INTO analytics (event_type, event_data, user_id, session_id, ip_address, user_agent, referrer)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `);

  const result = stmt.run(
    input.event_type,
    JSON.stringify(input.event_data),
    input.user_id ? parseInt(input.user_id) : null,
    input.session_id,
    input.ip_address,
    input.user_agent,
    input.referrer
  );

  const event = db.prepare('SELECT * FROM analytics WHERE id = ?').get(result.lastInsertRowid) as AnalyticsEvent;
  return {
    ...event,
    id: event.id.toString(),
    user_id: event.user_id ? event.user_id.toString() : undefined
  };
}