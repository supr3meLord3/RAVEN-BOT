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

async function init() {
  const client = await pool.connect();
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS bot_settings (
        id SERIAL PRIMARY KEY,
        key TEXT UNIQUE NOT NULL,
        value TEXT NOT NULL
      );
    `);

    for (const [key, value] of Object.entries(defaultSettings)) {
      await client.query(
        `
          INSERT INTO bot_settings (key, value)
          VALUES ($1, $2)
          ON CONFLICT (key) DO NOTHING;
        `,
        [key, value]
      );
    }

    console.log("👀 Bot settings initialized successfully.");
  } catch (err) {
    console.error("Error initializing bot settings:", err);
  } finally {
    client.release();
    pool.end();
  }
}

init();