import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import TeacherDashboard from './pages/TeacherDashboard';
import StudentDashboard from './pages/StudentDashboard';
import MaterialManagement from './pages/MaterialManagement';
import StudentMaterials from './pages/StudentMaterials'; // ✅ Import Student Materials Page
// import QuizManagement from './pages/AddQuestion';
import QuizManagement from './pages/QuizManagement';
import LiveSession from './pages/LiveSession';
import Statistics from './pages/Statistics';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';
import Support from './pages/Support';
import Settings from './pages/Settings'; // ✅ Import Settings Page

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/support' element={<Support />} />
          <Route path='/settings' element={<ProtectedRoute role={['teacher', 'student']}><Settings /></ProtectedRoute>} /> {/* ✅ Added Settings Route */}
          <Route path='/teacher' element={<ProtectedRoute role='teacher'><TeacherDashboard /></ProtectedRoute>} />
          <Route path='/student' element={<ProtectedRoute role='student'><StudentDashboard /></ProtectedRoute>} />
          <Route path='/lectures' element={<ProtectedRoute role={['teacher', 'student']}><MaterialManagement /></ProtectedRoute>} />
          <Route path='/materials' element={<ProtectedRoute role={['teacher', 'student']}><StudentMaterials /></ProtectedRoute>} /> {/* ✅ Added Student Materials Route */}
          <Route path='/quiz' element={<ProtectedRoute role={['teacher', 'student']}><QuizManagement /></ProtectedRoute>} />
          <Route path="/live" element={<ProtectedRoute role={['teacher', 'student']}><LiveSession /></ProtectedRoute>} />
          <Route path='/statistics' element={<ProtectedRoute role={['teacher', 'student']}><Statistics /></ProtectedRoute>} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
