// Student Dashboard dynamic loader
// Replace with real authentication/session logic in production

const username = prompt('Enter your username:');
const subject = prompt('Enter subject (C++, Python, Machine learning):');

function fetchAssignment() {
  fetch('http://localhost:3001/assign', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, subject })
  })
    .then(res => res.json())
    .then(data => {
      if (data.error) {
        document.getElementById('question').innerText = data.error;
      } else {
        document.getElementById('question').innerText = data.question;
        document.getElementById('status').innerText = 'Status: ' + data.status;
        document.getElementById('date').innerText = 'Assigned: ' + new Date(data.assigned_date).toLocaleString();
        document.getElementById('limit').innerText = 'Time Limit: ' + data.time_limit + ' min';
      }
    });
}

window.onload = fetchAssignment;
