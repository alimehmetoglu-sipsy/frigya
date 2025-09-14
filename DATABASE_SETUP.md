# Database Setup Documentation

## Overview
This project uses PostgreSQL as the database, optimized for deployment on Vercel with Vercel Postgres.

## Database Schema

The database consists of 4 main tables:

### 1. Users Table
- Stores user information for the Frigya application
- Fields: id, email, first_name, last_name, phone, created_at, updated_at

### 2. Registrations Table
- Stores registration requests for hiking tours
- Fields: id, user_id, experience_level, preferred_dates, group_size, motivation, status, created_at, updated_at
- Experience levels: beginner, intermediate, advanced, expert
- Status options: pending, approved, rejected, cancelled

### 3. Routes Table
- Stores hiking route information including GPS data
- Fields: id, name, description, distance_km, difficulty, gpx_data, markers, created_at, updated_at
- Difficulty levels: easy, moderate, hard, expert

### 4. Analytics Table
- Stores analytics events for tracking user behavior
- Fields: id, event_type, event_data, user_id, session_id, ip_address, user_agent, referrer, created_at

## Setup Instructions

### 1. Environment Variables

Copy the `.env.local.example` file to `.env.local`:
```bash
cp .env.local.example .env.local
```

Then fill in your database credentials:

#### For Vercel Postgres (Recommended):
1. Create a Postgres database in your Vercel dashboard
2. Copy the environment variables from Vercel dashboard
3. Add them to your `.env.local` file

#### For Local PostgreSQL:
```env
DATABASE_URL="postgresql://username:password@localhost:5432/frigya_db"
MIGRATION_SECRET="your-secure-secret-here"
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Run Database Migrations

#### Option A: Using npm script
```bash
npm run db:migrate
```

#### Option B: Using API endpoint (for production)
```bash
curl -X POST http://localhost:3000/api/db/migrate \
  -H "Authorization: Bearer YOUR_MIGRATION_SECRET"
```

### 4. Test Database Connection

```bash
npm run db:test
```

## Database Operations

### Using Query Functions

Import the query functions from `lib/db/queries.ts`:

```typescript
import {
  createUser,
  getUserByEmail,
  createRegistration,
  getAllRoutes,
  createAnalyticsEvent
} from '@/lib/db/queries';

// Example: Create a new user
const user = await createUser({
  email: 'user@example.com',
  first_name: 'John',
  last_name: 'Doe',
  phone: '+1234567890'
});

// Example: Create a registration
const registration = await createRegistration({
  user_id: user.id,
  experience_level: 'intermediate',
  preferred_dates: ['2025-09-20', '2025-09-27'],
  group_size: 4,
  motivation: 'Looking forward to exploring the Balkans!'
});

// Example: Track an analytics event
await createAnalyticsEvent({
  event_type: 'page_view',
  event_data: { page: '/routes' },
  user_id: user.id,
  session_id: 'session-123'
});
```

## API Endpoints

### Database Migration Status
```
GET /api/db/migrate
```
Returns database connection status and list of tables.

### Run Migrations
```
POST /api/db/migrate
Authorization: Bearer YOUR_MIGRATION_SECRET
```
Runs the database migrations.

## Indexes

The following indexes are created for optimal performance:
- `idx_users_email`: Unique index on users.email
- `idx_registrations_user_id`: Index on registrations.user_id
- `idx_registrations_status`: Index on registrations.status
- `idx_registrations_created_at`: Index on registrations.created_at (DESC)
- `idx_routes_difficulty`: Index on routes.difficulty
- `idx_routes_name`: Index on routes.name
- `idx_analytics_event_type`: Index on analytics.event_type
- `idx_analytics_created_at`: Index on analytics.created_at (DESC)
- `idx_analytics_user_id`: Index on analytics.user_id
- `idx_analytics_session_id`: Index on analytics.session_id

## Automatic Timestamps

All tables with `updated_at` columns have triggers that automatically update the timestamp when a row is modified.

## Type Safety

TypeScript types are provided in `lib/db/types.ts` for all database entities and input types.

## Troubleshooting

### Connection Issues
1. Check that your environment variables are set correctly
2. Ensure your database is accessible from your development environment
3. For Vercel deployment, ensure IP whitelisting is configured correctly

### Migration Errors
1. Check the migration logs for specific error messages
2. Ensure the database user has CREATE TABLE permissions
3. If tables already exist, you may need to drop them first (be careful with production data!)

## Production Deployment

1. Set environment variables in Vercel dashboard
2. Run migrations using the API endpoint with proper authentication
3. Monitor database performance using Vercel dashboard

## Security Notes

- Never commit `.env.local` file to version control
- Use strong, unique values for `MIGRATION_SECRET`
- Implement proper authentication before exposing database operations to users
- Use parameterized queries (already implemented in query functions) to prevent SQL injection