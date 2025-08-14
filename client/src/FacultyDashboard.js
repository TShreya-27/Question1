import React from 'react';

function FacultyDashboard() {
  // Placeholder: Fetch student-question assignments from backend
  const assignments = [
    { student: 'student1', question: 'Question A' },
    { student: 'student2', question: 'Question B' }
  ];
  return (
    <div>
      <h2>Faculty Dashboard</h2>
      <ul>
        {assignments.map((a, i) => (
          <li key={i}>{a.student}: {a.question}</li>
        ))}
      </ul>
    </div>
  );
}

export default FacultyDashboard;
