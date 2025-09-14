import fs from 'fs';
import path from 'path';
import Database from 'better-sqlite3';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

async function runMigration() {
  const migrationsDir = path.join(process.cwd(), 'lib', 'db', 'migrations');
  const migrationFile = path.join(migrationsDir, '001_initial_sqlite_schema.sql');

  if (!fs.existsSync(migrationFile)) {
    console.error('Migration file not found:', migrationFile);
    process.exit(1);
  }

  const migrationSQL = fs.readFileSync(migrationFile, 'utf-8');

  try {
    console.log('Running migration with SQLite...');

    // Initialize SQLite database
    const dbPath = path.join(process.cwd(), 'frigya.db');
    const db = new Database(dbPath);

    // Enable foreign key constraints
    db.pragma('foreign_keys = ON');

    // Execute the entire migration as a single script
    try {
      db.exec(migrationSQL);
      console.log('✓ Migration executed successfully');
    } catch (error: any) {
      if (error.message.includes('already exists') || error.message.includes('duplicate')) {
        console.log('⚠ Some objects already exist, continuing...');
      } else {
        throw error;
      }
    }

    db.close();
    console.log('Migration completed successfully with SQLite');
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  }
}

if (require.main === module) {
  runMigration();
}

export default runMigration;