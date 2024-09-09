const mysql = require("mysql2/promise");
require("dotenv").config();
const pool = mysql.createPool({
  host: process.env.DBHOST,
  user: process.env.DBUSER,
  password: process.env.PASSWORD,
  database: process.env.DATABASENAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

const verifyConnection = async () => {
  try {
    const checkConnection = await pool.getConnection();
    checkConnection.query("select 1");
    console.log("Database is Connected Successfully");
    checkConnection.release();
  } catch (err) {
    console.log("There might be an issue with database");
  }
};

module.exports = { pool, verifyConnection };
