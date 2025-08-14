import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './LoginPage';
import SignupPage from './SignupPage';
import StudentDashboard from './StudentDashboard';

function App() {
  const [role, setRole] = useState(''); // 'student' or 'faculty'

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage setRole={setRole} />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route 
          path="/student" 
          element={role === 'student' ? <StudentDashboard /> : <Navigate to="/" />} 
        />
  {/* Catch-all route for unmatched paths */}
  <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
