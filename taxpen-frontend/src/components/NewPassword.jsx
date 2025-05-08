import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

export default function NewPassword() {
  const [form, setForm] = useState({ email: '', newPassword: '' });
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    await api.post('/auth/reset-password', form);
    navigate('/login');
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto mt-20 p-6 bg-white rounded shadow">
      <img src="/logo.png" alt="Logo" className="w-24 mx-auto mb-4" />
      <input type="email" placeholder="อีเมล" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} className="w-full mb-3 p-2 border rounded" />
      <input type="password" placeholder="รหัสผ่านใหม่" value={form.newPassword} onChange={e => setForm({ ...form, newPassword: e.target.value })} className="w-full mb-4 p-2 border rounded" />
      <button className="w-full bg-green-500 text-white p-2 rounded">บันทึก</button>
    </form>
  )
}