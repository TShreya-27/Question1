import React, { useState } from 'react';

function LoginPage() {
  const [role, setRole] = useState('student');
  return (
    <div>
      <h2>Login</h2>
      <form>
        <label>
          Role:
          <select value={role} onChange={e => setRole(e.target.value)}>
            <option value="student">Student</option>
            <option value="faculty">Faculty</option>
          </select>
        </label>
        <br />
        <input type="text" placeholder="Username" />
        <br />
        <input type="password" placeholder="Password" />
        <br />
        <button type="submit">Login</button>
      </form>
      <a href="/signup">Sign up</a>
    </div>
  );
}

export default LoginPage;
