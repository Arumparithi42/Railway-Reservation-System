const oracledb = require('oracledb');
require('dotenv').config();

(async () => {
  try {
    oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;
    const conn = await oracledb.getConnection({
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      connectString: process.env.DB_CONNECT_STRING,
    });
    const result = await conn.execute('SELECT table_name FROM user_tables ORDER BY table_name');
    console.log(JSON.stringify(result.rows, null, 2));
    await conn.close();
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
})();
