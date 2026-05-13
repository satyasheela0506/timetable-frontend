import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import AdminDashboard from './pages/admin/AdminDashboard';
import FacultyDashboard from './pages/faculty/FacultyDashboard';
import StudentDashboard from './pages/student/StudentDashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        
        {/* Placeholder Admin Routes */}
        <Route path="/admin/*" element={<AdminDashboard />} />
        
        {/* Placeholder Faculty Routes */}
        <Route path="/faculty/*" element={<FacultyDashboard />} />
        
        {/* Placeholder Student Routes */}
        <Route path="/student/*" element={<StudentDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
