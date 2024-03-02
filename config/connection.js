require('dotenv').config();
const mysql = require('mysql2/promise');

// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: 'employees_db'
  },

).then((connection) => { 
  console.log(`Connected to the employees_db database.`);
  return connection
});

module.exports = db;