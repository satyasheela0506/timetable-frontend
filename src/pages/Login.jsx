import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Form, Button, Dropdown } from 'react-bootstrap';
import { LogIn } from 'lucide-react';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (!role) {
      alert("Please select a role to login as.");
      return;
    }
    // Placeholder login logic
    if (role === 'admin') navigate('/admin');
    else if (role === 'faculty') navigate('/faculty');
    else navigate('/student');
  };

  return (
    <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
      <Row className="w-100 justify-content-center">
        <Col md={6} lg={4}>
          <div className="glass-card p-5 text-center">
            <div className="mb-4">
              <div className="d-inline-flex align-items-center justify-content-center rounded-circle bg-primary bg-opacity-25" style={{ width: '64px', height: '64px' }}>
                <LogIn size={32} className="text-primary" />
              </div>
              <h3 className="mt-3 font-weight-bold">Timetable Management</h3>
              <p className="text-muted">Sign in to your account</p>
            </div>
            
            <Form onSubmit={handleLogin}>
              <Dropdown className="mb-4">
                <Dropdown.Toggle 
                  variant="outline-light" 
                  id="role-dropdown" 
                  className="w-100 py-2 text-start d-flex justify-content-between align-items-center"
                  style={{ backgroundColor: 'rgba(15, 23, 42, 0.6)', borderColor: 'rgba(255, 255, 255, 0.2)' }}
                >
                  {role ? `Login as: ${role.charAt(0).toUpperCase() + role.slice(1)}` : 'Login as...'}
                </Dropdown.Toggle>

                <Dropdown.Menu className="w-100 dropdown-menu-dark">
                  <Dropdown.Item onClick={() => setRole('student')}>Student</Dropdown.Item>
                  <Dropdown.Item onClick={() => setRole('faculty')}>Faculty</Dropdown.Item>
                  <Dropdown.Item onClick={() => setRole('admin')}>Administrator</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>

              <Form.Group className="mb-3" controlId="username">
                <Form.Control 
                  type="text" 
                  placeholder="Username" 
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="py-2"
                />
              </Form.Group>

              <Form.Group className="mb-4" controlId="password">
                <Form.Control 
                  type="password" 
                  placeholder="Password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="py-2"
                />
              </Form.Group>

              <Button variant="primary" type="submit" className="w-100 py-2 fw-bold">
                Sign In
              </Button>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
