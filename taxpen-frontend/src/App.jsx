import React, { useEffect } from 'react';
import { Routes, Route, NavLink, Navigate, useNavigate } from 'react-router-dom';
import { Home as HomeIcon, PlusCircle, Smartphone, FileText, User as UserIcon, LogOut } from 'lucide-react';
import Splash from './components/Splash';
import Login from './components/Login';
import Register from './components/Register';
import OTPVerify from './components/OTPVerify';
import NewPassword from './components/NewPassword';
import Home from './components/Home';
import AdditionStep1 from './components/AdditionStep1';
import AdditionStep2 from './components/AdditionStep2';
import Documents from './components/Documents';
import EditDocument from './components/EditDocument';
import Scan from './components/Scan';
import Account from './components/Account';
import Logout from './components/Logout';
import TaxLaw from './components/TaxLaw';

export default function App() {
  const navigate = useNavigate();

  // Periodically check token every 1 second
  useEffect(() => {
    const interval = setInterval(() => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login', { replace: true });
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [navigate]);

  // Protected route wrapper
  const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem('token');
    return token ? children : <Navigate to="/login" replace />;
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Main Content */}
      <div className="flex-grow overflow-auto p-4 bg-gray-50">
        <Routes>
          {/* Public / Onboarding */}
          <Route path="/" element={<Splash onContinue={() => navigate('/login')} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/verify" element={<OTPVerify />} />
          <Route path="/new-password" element={<NewPassword />} />

          {/* Protected routes */}
          <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="/addition/1" element={<ProtectedRoute><AdditionStep1 /></ProtectedRoute>} />
          <Route path="/addition/2" element={<ProtectedRoute><AdditionStep2 /></ProtectedRoute>} />
          <Route path="/documents" element={<ProtectedRoute><Documents /></ProtectedRoute>} />
          <Route path="/documents/:id/edit" element={<ProtectedRoute><EditDocument /></ProtectedRoute>} />
          <Route path="/scan" element={<ProtectedRoute><Scan /></ProtectedRoute>} />
          <Route path="/account" element={<ProtectedRoute><Account /></ProtectedRoute>} />
          <Route path="/logout" element={<ProtectedRoute><Logout /></ProtectedRoute>} />
          <Route path="/tax-law" element={<ProtectedRoute><TaxLaw /></ProtectedRoute>} />

          {/* Fallback based on auth */}
          <Route
            path="*"
            element={
              localStorage.getItem('token') ? (
                <Navigate to="/home" replace />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
        </Routes>
      </div>

      {/* Bottom Navigation for authenticated users */}
      {localStorage.getItem('token') && (
        <nav className="bg-green-200 p-3 flex justify-around text-green-700">
          <NavLink to="/home" className="flex flex-col items-center"><HomeIcon size={20} /><span>หน้าแรก</span></NavLink>
          <NavLink to="/addition/1" className="flex flex-col items-center"><PlusCircle size={20} /><span>เพิ่ม</span></NavLink>
          <NavLink to="/scan" className="flex flex-col items-center"><Smartphone size={20} /><span>สแกน</span></NavLink>
          <NavLink to="/documents" className="flex flex-col items-center"><FileText size={20} /><span>เอกสาร</span></NavLink>
          <NavLink to="/account" className="flex flex-col items-center"><UserIcon size={20} /><span>บัญชี</span></NavLink>
          <NavLink to="/logout" className="flex flex-col items-center"><LogOut size={20} /><span>ออกจากระบบ</span></NavLink>
        </nav>
      )}
    </div>
  );
}