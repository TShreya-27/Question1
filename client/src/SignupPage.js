import React from 'react';

function SignupPage() {
  return (
    <div>
      <h2>Sign Up</h2>
      <form>
        <input type="text" placeholder="Username" />
        <br />
        <input type="password" placeholder="Password" />
        <br />
        <select>
          <option value="student">Student</option>
          <option value="faculty">Faculty</option>
        </select>
        <br />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default SignupPage;
