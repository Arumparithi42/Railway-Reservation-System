const fs = require('fs');
const oracledb = require('oracledb');
require('dotenv').config();

(async () => {
  try {
    oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;
    const sql = fs.readFileSync('./sql/schema.sql', 'utf8');
    const conn = await oracledb.getConnection({
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      connectString: process.env.DB_CONNECT_STRING,
    });
    const statements = sql.split(/;\s*\n/).map(s => s.trim()).filter(Boolean);
    for (const statement of statements) {
      try {
        await conn.execute(statement);
      } catch (err) {
        console.error('Statement failed:', statement.split('\n')[0]);
        console.error(err.message);
      }
    }
    await conn.commit();
    console.log('Schema loaded.');
    await conn.close();
  } catch (err) {
    console.error('Schema load failed:', err.message);
    process.exit(1);
  }
})();
