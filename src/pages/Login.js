import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { FiLogIn } from 'react-icons/fi';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      
      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('role', data.role);
        
        if (data.role === 'teacher') {
          navigate('/teacher');
        } else if (data.role === 'student') {
          navigate('/student');
        } else {
          alert('Unknown role. Contact admin.');
        }
      } else {
        alert(data.message || 'Login failed');
      }
    } catch (error) {
      console.error('Login Error:', error);
      alert('Server error. Try again later.');
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card shadow-lg p-4 rounded-4" style={{ width: '400px', background: '#fff' }}>
        <div className="text-center mb-3">
          <FiLogIn size={40} className="text-primary" />
        </div>
        <h2 className="text-center text-dark fw-bold mb-3">Login</h2>
        <form onSubmit={handleLogin}>
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
          <button type="submit" className="btn btn-primary w-100 p-2 rounded-3 fw-semibold">Login</button>
        </form>
        <p className="text-center mt-3">
          Don't have an account? <a href="/register" className="text-decoration-none text-primary fw-semibold">Register</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
