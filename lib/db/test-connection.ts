import Database from 'better-sqlite3';
import path from 'path';

async function testConnection() {
  try {
    console.log('Testing SQLite database connection...');

    const dbPath = path.join(process.cwd(), 'frigya.db');
    const db = new Database(dbPath);

    // Enable foreign key constraints
    db.pragma('foreign_keys = ON');

    // Test basic queries
    const tables = db.prepare(`
      SELECT name FROM sqlite_master
      WHERE type='table' AND name NOT LIKE 'sqlite_%'
      ORDER BY name
    `).all();

    console.log('✓ Database connection successful');
    console.log('Tables found:', tables.map(t => t.name).join(', '));

    // Test user query
    const userCount = db.prepare('SELECT COUNT(*) as count FROM users').get();
    console.log(`✓ Users table: ${userCount.count} records`);

    // Test registration query
    const regCount = db.prepare('SELECT COUNT(*) as count FROM registrations').get();
    console.log(`✓ Registrations table: ${regCount.count} records`);

    // Test routes query
    const routeCount = db.prepare('SELECT COUNT(*) as count FROM routes').get();
    console.log(`✓ Routes table: ${routeCount.count} records`);

    // Test analytics query
    const analyticsCount = db.prepare('SELECT COUNT(*) as count FROM analytics').get();
    console.log(`✓ Analytics table: ${analyticsCount.count} records`);

    db.close();
    console.log('✓ Database test completed successfully');

  } catch (error) {
    console.error('❌ Database test failed:', error);
    process.exit(1);
  }
}

if (require.main === module) {
  testConnection();
}

export default testConnection;