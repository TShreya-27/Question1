const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('labapp.db');

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE,
    password TEXT,
    role TEXT
  )`);
  db.run(`CREATE TABLE IF NOT EXISTS assignments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    student TEXT,
    question TEXT,
    status TEXT,
    assigned_date TEXT,
    time_limit INTEGER,
    subject TEXT
  )`);
});

module.exports = db;
