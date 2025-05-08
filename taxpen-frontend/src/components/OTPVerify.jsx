import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

export default function OTPVerify() {
  const [email, setEmail] = useState('');
  const [code, setCode] = useState(['', '', '', '']);
  const navigate = useNavigate();

  const sendOTP = async () => {
    await api.post('/auth/forgot-password', { email });
  };

  const verifyOTP = async () => {
    const otp = code.join('');
    await api.post('/auth/reset-password', { email, otp, newPassword: '' });
    navigate('/new-password');
  };

  return (
    <form className="max-w-sm mx-auto mt-20 p-6 bg-white rounded shadow">
      <img src="/logo.png" alt="Logo" className="w-24 mx-auto mb-4" />
      <input type="email" placeholder="อีเมล" value={email} onChange={e => setEmail(e.target.value)} className="w-full mb-3 p-2 border rounded" />
      <button type="button" onClick={sendOTP} className="w-full bg-green-500 text-white p-2 rounded mb-4">ส่ง OTP</button>
      <div className="flex justify-between mb-4">
        {code.map((v, i) => (
          <input key={i} maxLength={1} value={v} onChange={e => { const nc = [...code]; nc[i] = e.target.value; setCode(nc); }} className="w-12 h-12 border rounded text-center" />
        ))}
      </div>
      <button type="button" onClick={verifyOTP} className="w-full bg-green-500 text-white p-2 rounded">ยืนยัน</button>
    </form>
  );
}