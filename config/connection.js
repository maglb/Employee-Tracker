require('dotenv').config();
const mysql = require('mysql2/promise');
const express = require('express');

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: 'employees_db'
  },
  console.log(`Connected to the employees_db database.`)
);

module.exports = db;