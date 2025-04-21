import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import Sidebar from './components/Sidebar';

export default function App() {
  const token = localStorage.getItem('token');
  return (
    <div style={{ display: 'flex', width: '100%', height: '100%' }}>
      {token && <Sidebar />}
      <main style={{ flex: 1, padding: '1rem', overflow: 'auto' }}>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route
            path="/dashboard"
            element={
              token ? <DashboardPage /> : <Navigate to="/login" replace />
            }
          />
          <Route
            path="/"
            element={<Navigate to={token ? '/dashboard' : '/login'} replace />}
          />
        </Routes>
      </main>
    </div>
  );
}