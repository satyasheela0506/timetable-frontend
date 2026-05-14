import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CalendarClock, Users, User } from 'lucide-react';
import './Login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [role, setRole] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (!role) {
      alert("Please select a role to login as.");
      return;
    }
    if (!username) {
      alert("Please enter your Login ID.");
      return;
    }
    // Placeholder login logic
    if (role === 'admin') navigate('/admin');
    else if (role === 'faculty') navigate('/faculty');
    else navigate('/student');
  };

  return (
    <div className="login-page-wrapper">
      {/* Background Shapes */}
      <div className="login-bg-shapes">
        <div className="shape-circle-1"></div>
        <div className="shape-circle-2"></div>
        <div className="shape-dots"></div>
      </div>

      <div className="login-card-container">
        <div className="login-card">
          
          <div className="login-header">
            <div className="login-icon-container">
              <CalendarClock size={40} />
            </div>
            <h1 className="login-title">Timetable Management</h1>
            <p className="login-subtitle">Sign in to your account</p>
          </div>

          <form onSubmit={handleLogin}>
            <div className="login-form-row">
              
              {/* Column 1: Login As */}
              <div className="login-col">
                <label className="login-label">Login As</label>
                <div className="custom-input-group custom-select-wrapper">
                  <div className="custom-input-icon">
                    <Users size={20} />
                  </div>
                  <select 
                    className="custom-select" 
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    required
                  >
                    <option value="" disabled>Select Role</option>
                    <option value="faculty">Faculty</option>
                    <option value="student">Student</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
              </div>

              {/* Column 2: Login ID */}
              <div className="login-col">
                <label className="login-label">Login ID</label>
                <div className="custom-input-group custom-input-wrapper">
                  <div className="custom-input-icon">
                    <User size={20} />
                  </div>
                  <input 
                    type="text" 
                    className="custom-input" 
                    placeholder="Enter Login ID" 
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* Column 3: Login Button */}
              <div className="login-col">
                <label className="login-label" style={{ visibility: 'hidden' }}>Submit</label>
                <button type="submit" className="login-btn">
                  LOGIN
                </button>
              </div>

            </div>
          </form>

        </div>
      </div>
    </div>
  );
};

export default Login;
