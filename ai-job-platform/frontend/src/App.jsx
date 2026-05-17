import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ForgotPassword from './pages/ForgotPassword';
import OTPVerification from './pages/OTPVerification';
import UserDashboard from './pages/UserDashboard';
import JobRecommendations from './pages/JobRecommendations';
import SkillRecommendations from './pages/SkillRecommendations';
import ResumeAnalysis from './pages/ResumeAnalysis';
import AnalyticsDashboard from './pages/AnalyticsDashboard';
import Settings from './pages/Settings';
import Onboarding from './pages/Onboarding';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <div className="app-root">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/verify-otp" element={<OTPVerification />} />
          <Route path="/onboarding" element={<ProtectedRoute><Onboarding /></ProtectedRoute>} />
          
          {/* Protected Routes */}
          <Route path="/dashboard" element={<ProtectedRoute><UserDashboard /></ProtectedRoute>} />
          <Route path="/jobs" element={<ProtectedRoute><JobRecommendations /></ProtectedRoute>} />
          <Route path="/skills" element={<ProtectedRoute><SkillRecommendations /></ProtectedRoute>} />
          <Route path="/resume" element={<ProtectedRoute><ResumeAnalysis /></ProtectedRoute>} />
          <Route path="/analytics" element={<ProtectedRoute><AnalyticsDashboard /></ProtectedRoute>} />
          <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
          
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        <ToastContainer theme="dark" position="bottom-right" />
      </div>
    </Router>
  );
}

export default App;
