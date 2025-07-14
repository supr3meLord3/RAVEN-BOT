const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

const defaultSettings = {
  antilink: 'on',
  autoread: 'off',
  mode: 'public',
  prefix: '.',
  autolike: 'on',
  autoviewstatus: 'on',
  wapresence: 'recording'
};

async function getSettings() {
  const client = await pool.connect();
  console.log("📡 Connected to PostgreSQL database...");

  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS bot_settings (
        id SERIAL PRIMARY KEY,
        key TEXT UNIQUE NOT NULL,
        value TEXT NOT NULL
      );
    `);
    console.log("✅ Table imeundwa");

    for (const [key, value] of Object.entries(defaultSettings)) {
      const res = await client.query(
        `INSERT INTO bot_settings (key, value)
         VALUES ($1, $2)
         ON CONFLICT (key) DO NOTHING;`,
        [key, value]
      );

      if (res.rowCount > 0) {
        
      }
    }

    const result = await client.query(
      `SELECT key, value FROM bot_settings WHERE key = ANY($1::text[])`,
      [Object.keys(defaultSettings)]
    );

    const settings = {};
    for (const row of result.rows) {
      settings[row.key] = row.value;
    }

    console.log("✅ Settings loaded from database.");
    return settings;

  } catch (err) {
    console.error("❌ Error initializing or fetching settings:", err);
    return defaultSettings;

  } finally {
    client.release();
  }
}

module.exports = getSettings;