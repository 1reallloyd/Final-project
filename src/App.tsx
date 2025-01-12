import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { Login } from './components/Login';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { Dashboard } from './components/Dashboard';
import { UploadDataset } from './components/UploadDataset';
import { FraudDetection } from './components/FraudDetection';
import { ClaimsPrediction } from './components/ClaimsPrediction';
import { Reports } from './components/Reports';
import { Settings } from './components/Settings';
import { Footer } from './components/Footer';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/*"
            element={
              <ProtectedRoute>
                <div className="flex h-screen bg-gray-50">
                  <Sidebar />
                  <div className="flex flex-col flex-1 overflow-hidden">
                    <Header />
                    <Routes>
                      <Route path="/" element={<Dashboard />} />
                      <Route path="/upload" element={<UploadDataset />} />
                      <Route path="/fraud" element={<FraudDetection />} />
                      <Route path="/predictions" element={<ClaimsPrediction />} />
                      <Route path="/reports" element={<Reports />} />
                      <Route path="/settings" element={<Settings />} />
                      <Route path="*" element={<Navigate to="/" replace />} />
                    </Routes>
                    <Footer />
                  </div>
                </div>
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;