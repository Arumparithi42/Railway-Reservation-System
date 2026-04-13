const oracledb = require('oracledb');
require('dotenv').config();

oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;

const dbConfig = {
  user: process.env.DB_USER || 'system',
  password: process.env.DB_PASSWORD || 'oracle',
  connectString: process.env.DB_CONNECT_STRING || 'localhost/XEPDB1',
  poolMin: 1,
  poolMax: 10,
  poolIncrement: 1,
};

let pool;

async function initPool() {
  if (pool) return pool;
  pool = await oracledb.createPool(dbConfig);
  return pool;
}

async function closePool() {
  if (pool) {
    await pool.close(0);
    pool = null;
  }
}

async function execute(query, binds = [], options = { autoCommit: true }) {
  const pool = await initPool();
  const connection = await pool.getConnection();
  try {
    const result = await connection.execute(query, binds, options);
    return result;
  } finally {
    await connection.close();
  }
}

module.exports = {
  initPool,
  closePool,
  execute,
};
