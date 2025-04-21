import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import UploadPage from './pages/UploadPage';
import HistoryPage from './pages/HistoryPage';
import TaxCalcPage from './pages/TaxCalcPage';
import DeductionTypesPage from './pages/DeductionTypesPage';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';

function PrivateRoute({ children }) {
  return localStorage.getItem('token') ? children : <Navigate to="/login" />;
}

export default function App() {
  return (
    <div className="app-container">
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/*"
          element={
            <PrivateRoute>
              <Navbar />
              <div className="main-layout">
                <Sidebar />
                <div className="page-content">
                  <Routes>
                    <Route path="profile" element={<ProfilePage />} />
                    <Route path="upload" element={<UploadPage />} />
                    <Route path="history/:id" element={<HistoryPage />} />
                    <Route path="tax" element={<TaxCalcPage />} />
                    <Route path="deductions" element={<DeductionTypesPage />} />
                    <Route path="*" element={<Navigate to="profile" />} />
                  </Routes>
                </div>
              </div>
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
}
