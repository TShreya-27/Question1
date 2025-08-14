import React from 'react';

function StudentDashboard() {
  // Placeholder: Fetch assigned question from backend
  const assignedQuestion = 'Your unique lab question will appear here.';
  return (
    <div>
      <h2>Student Dashboard</h2>
      <p>{assignedQuestion}</p>
    </div>
  );
}

export default StudentDashboard;
