import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import VisitorForm from './pages/visitor/VisitorForm';
import 'react-toastify/dist/ReactToastify.css';
import Layout from './components/Layout';
import VisitorList from './pages/visitor/VisitorList';
import VisitorDetails from './pages/visitor/VisitorDetails';
import { AuthProvider } from './context/AuthContext';
import LoginPage from './pages/LoginPage';
import ProtectedRoute from './routes/ProtectedRoute';
import MeetingForm from './pages/meeting/MeetingForm';
import MeetHome from './pages/meeting/MeetHome';
import MeetingDetails from './pages/meeting/MeetingDetails';
import VisitorHome from './pages/visitor/VisitorHome';

function App() {
  return (
   <BrowserRouter>
   <AuthProvider>
      <Routes>
        <Route path="/login" element={<LoginPage/>} />
        <Route path='/' element={<ProtectedRoute><Layout/></ProtectedRoute>}>
        <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/about" element={<About />} />
        <Route path="/visitor" element={<VisitorForm />} />
        <Route path="/visitor-list" element={<VisitorHome />} />
        <Route path="/visitor/:id" element={<VisitorDetails />} />
        <Route path="/meeting" element={<MeetHome />} />
        <Route path="/meetingAdd" element={<MeetingForm />} />
        <Route path="/meeting/:id" element={<MeetingDetails />} />
        <Route path="*" element={<h1>404 Not Found</h1>} />
         
      </Route>
      </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;