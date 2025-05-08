import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

export default function Register() {
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await api.post('/auth/register', form);
      navigate('/verify');
    } catch {
      setError('ไม่สามารถลงทะเบียน');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto mt-20 p-6 bg-white rounded shadow">
      <img src="/logo.png" alt="Logo" className="w-24 mx-auto mb-4" />
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <input type="text" placeholder="ชื่อ" value={form.firstName} onChange={e => setForm({ ...form, firstName: e.target.value })} className="w-full mb-3 p-2 border rounded" />
      <input type="text" placeholder="นามสกุล" value={form.lastName} onChange={e => setForm({ ...form, lastName: e.target.value })} className="w-full mb-3 p-2 border rounded" />
      <input type="email" placeholder="อีเมล" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} className="w-full mb-3 p-2 border rounded" />
      <input type="password" placeholder="รหัสผ่าน" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} className="w-full mb-4 p-2 border rounded" />
      <button className="w-full bg-green-500 text-white p-2 rounded">ลงทะเบียน</button>
    </form>
  );
}