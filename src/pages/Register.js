import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { FiLogIn } from 'react-icons/fi';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student'); // Default role
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, role }),
      });

      const data = await response.json();
      if (response.ok) {
        alert('✅ Registration successful! Please log in.');
        navigate('/'); // Redirect to login
      } else {
        alert(`❌ Registration failed: ${data.message}`);
      }
    } catch (error) {
      alert('❌ Server error! Try again later.');
      console.error('Error:', error);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card shadow-lg p-4 rounded-4" style={{ width: '400px', background: '#fff' }}>
        <div className="text-center mb-3">
          <FiLogIn size={40} className="text-primary" />
        </div>
        <h2 className="text-center text-dark fw-bold mb-3">Sign Up</h2>
        <form onSubmit={handleRegister}>
          <div className="mb-3">
            <label className="form-label fw-semibold">Email address</label>
            <input 
              type="email" 
              placeholder="Enter your email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
              className="form-control p-2 rounded-3"
            />
          </div>
          <div className="mb-3">
            <label className="form-label fw-semibold">Password</label>
            <input 
              type="password" 
              placeholder="Enter your password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
              className="form-control p-2 rounded-3"
            />
          </div>
          <div className="mb-3">
            <label className="form-label fw-semibold">Role</label>
            <select 
              value={role} 
              onChange={(e) => setRole(e.target.value)} 
              className="form-select p-2 rounded-3"
            >
              <option value="teacher">Teacher</option>
              <option value="student">Student</option>
            </select>
          </div>
          <button type="submit" className="btn btn-primary w-100 p-2 rounded-3 fw-semibold">Sign Up</button>
        </form>
        <p className="text-center mt-3">
          Already have an account? <a href="/" className="text-decoration-none text-primary fw-semibold">Login</a>
        </p>
      </div>
    </div>
  );
};

export default Register;
