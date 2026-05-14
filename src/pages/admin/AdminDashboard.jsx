import React, { useState, useEffect } from 'react';
import { Container, Navbar, Nav, Row, Col, Card, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { LogOut, Users, BookOpen, MapPin, Calendar } from 'lucide-react';
import axios from 'axios';
import TimetableGrid from '../../components/TimetableGrid';
import ImageUpload from '../../components/ImageUpload';

const API_URL = 'http://localhost:5000/api';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [section, setSection] = useState('A');
  const [timetable, setTimetable] = useState([]);
  const [days, setDays] = useState([]);
  const [timeSlots, setTimeSlots] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleLogout = () => {
    navigate('/login');
  };

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const [daysRes, slotsRes] = await Promise.all([
          axios.get(`${API_URL}/days`),
          axios.get(`${API_URL}/timeslots`)
        ]);
        setDays(daysRes.data);
        setTimeSlots(slotsRes.data);
      } catch (error) {
        console.error('Error fetching settings', error);
      }
    };
    fetchSettings();
  }, []);

  useEffect(() => {
    const fetchTimetable = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${API_URL}/timetable/section/${section}`);
        setTimetable(res.data);
      } catch (error) {
        console.error('Error fetching timetable', error);
      } finally {
        setLoading(false);
      }
    };
    if (section) fetchTimetable();
  }, [section]);

  return (
    <div>
      <Navbar bg="dark" variant="dark" expand="lg" className="border-bottom border-secondary shadow-sm">
        <Container>
          <Navbar.Brand className="fw-bold text-primary">Admin Portal</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
            <Nav>
              <Nav.Link onClick={handleLogout} className="d-flex align-items-center text-danger">
                <LogOut size={18} className="me-2" /> Logout
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container className="py-5">
        <h2 className="mb-4 fw-bold">Dashboard Overview</h2>
        <Row className="g-4 mb-5">
          <Col md={3}>
            <Card className="glass-card text-center h-100 border-0">
              <Card.Body className="d-flex flex-column align-items-center justify-content-center py-5">
                <Users size={48} className="text-primary mb-3" />
                <Card.Title>Manage Faculty</Card.Title>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="glass-card text-center h-100 border-0">
              <Card.Body className="d-flex flex-column align-items-center justify-content-center py-5">
                <BookOpen size={48} className="text-success mb-3" />
                <Card.Title>Manage Subjects</Card.Title>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="glass-card text-center h-100 border-0">
              <Card.Body className="d-flex flex-column align-items-center justify-content-center py-5">
                <MapPin size={48} className="text-warning mb-3" />
                <Card.Title>Manage Rooms</Card.Title>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="glass-card text-center h-100 border-0">
              <Card.Body className="d-flex flex-column align-items-center justify-content-center py-5">
                <Calendar size={48} className="text-info mb-3" />
                <Card.Title>Generate Timetable</Card.Title>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        
        <Row className="mb-5">
          <Col md={12}>
            <Card className="glass-card border-0 shadow-sm">
              <Card.Header className="bg-transparent border-bottom border-secondary py-3">
                <h4 className="mb-0 fw-bold">System Configuration / Profile</h4>
              </Card.Header>
              <Card.Body>
                <Row className="align-items-center">
                  <Col lg={6}>
                    <p className="text-muted mb-4">
                      Upload your profile image or official documents. Files are securely stored on Cloudinary 
                      and the links are optimized for fast delivery.
                    </p>
                    <ImageUpload 
                      onUploadSuccess={(url) => {
                        console.log('File uploaded to:', url);
                        alert('Cloudinary URL: ' + url);
                      }} 
                    />
                  </Col>
                  <Col lg={6} className="text-center d-none d-lg-block">
                    <img 
                      src="https://res.cloudinary.com/demo/image/upload/v1625215771/sample.jpg" 
                      alt="Preview placeholder" 
                      className="img-fluid rounded-4 shadow-lg"
                      style={{ maxWidth: '300px', opacity: 0.7 }}
                    />
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
          <h3 className="fw-bold">Master Timetable Viewer</h3>
          <div className="d-flex align-items-center">
            <span className="text-muted me-3">View Section:</span>
            <Form.Select 
              value={section} 
              onChange={(e) => setSection(e.target.value)}
              className="bg-dark text-light border-secondary shadow-none w-auto"
            >
              {['A', 'B', 'C', 'D', 'E'].map(sec => (
                <option key={sec} value={sec}>Section {sec}</option>
              ))}
            </Form.Select>
          </div>
        </div>
        
        {loading ? (
          <div className="text-center py-5 text-muted">Loading timetable...</div>
        ) : (
          <TimetableGrid timetable={timetable} days={days} timeSlots={timeSlots} />
        )}
      </Container>
    </div>
  );
};

export default AdminDashboard;
