const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const { GoogleGenerativeAI } = require("@google/generative-ai");
const db = require('./db');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Signup endpoint
app.post('/signup', (req, res) => {
  const { username, password, role } = req.body;
  db.run(
    'INSERT INTO users (username, password, role) VALUES (?, ?, ?)',
    [username, password, role],
    function (err) {
      if (err) return res.status(400).json({ error: 'User exists' });
      res.json({ success: true });
    }
  );
});

// Login endpoint
app.post('/login', (req, res) => {
  const { username, password, role } = req.body;
  db.get(
    'SELECT * FROM users WHERE username = ? AND password = ? AND role = ?',
    [username, password, role],
    (err, user) => {
      if (err || !user) return res.status(401).json({ error: 'Invalid credentials' });
      res.json({ success: true });
    }
  );
});

// Assign unique question using Gemini API
app.post('/assign', async (req, res) => {
  const { username, subject } = req.body;
  db.get('SELECT * FROM users WHERE username = ?', [username], async (err, user) => {
    if (err || !user) return res.status(404).json({ error: 'User not found' });

    db.get('SELECT * FROM assignments WHERE student = ?', [username], async (err, row) => {
      if (row) return res.json(row);

       let prompt;
       if (subject === 'Python') {
         prompt = `Generate a brief, unique Python lab question for a student. The question must clearly define the objective requirement and specify the desired output. Focus on Python programming concepts, data structures, or algorithms. Keep the question concise and focused on a single coding task.`;
       } else if (subject === 'Machine learning') {
         prompt = `Generate a brief, unique Machine Learning lab question for a student. The question must clearly define the objective requirement and specify the desired output. Focus on practical ML problems, model implementation, or data analysis using Python. Keep the question concise and focused on a single coding or analysis task.`;
       } else {
         prompt = `Generate a brief, unique lab question for the subject ${subject}. The question must clearly define the objective requirement and specify the desired output. Keep the question concise and focused on a single task.`;
       }

      try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const result = await model.generateContent(prompt);
        const question = result.response.text();

        const assignedDate = new Date().toISOString();
        const timeLimit = 60; // in minutes

        db.run(
          'INSERT INTO assignments (student, question, status, assigned_date, time_limit, subject) VALUES (?, ?, ?, ?, ?, ?)',
          [username, question, 'not attempted', assignedDate, timeLimit, subject],
          function (err) {
            if (err) return res.status(500).json({ error: 'Assignment failed' });
            res.json({ student: username, question, status: 'not attempted', assigned_date: assignedDate, time_limit: timeLimit, subject });
          }
        );
      } catch (e) {
        res.status(500).json({ error: 'Gemini API error', details: e.message });
      }
    });
  });
});


// Update assignment status
app.post('/assignment/status', (req, res) => {
  const { username, status } = req.body;
  db.run('UPDATE assignments SET status = ? WHERE student = ?', [status, username], function (err) {
    if (err) return res.status(500).json({ error: 'Update failed' });
    res.json({ success: true });
  });
});

app.listen(3001, () => console.log('Server running on port 3001'));
