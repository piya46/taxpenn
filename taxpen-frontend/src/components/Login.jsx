import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import { Mail, Lock } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const { data } = await api.post('/auth/login', { email, password });
      localStorage.setItem('token', data.token);
      navigate('/home', { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto mt-20 p-6 bg-white rounded shadow space-y-4">
      <Mail className="mx-auto text-green-500" size={32} />
      <input type="email" placeholder="อีเมล" value={email} onChange={e => setEmail(e.target.value)} className="w-full p-2 border rounded" />
      <Lock className="text-green-500" size={20} />
      <input type="password" placeholder="รหัสผ่าน" value={password} onChange={e => setPassword(e.target.value)} className="w-full p-2 border rounded" />
      {error && <p className="text-red-500">{error}</p>}
      <button type="submit" className="w-full bg-green-500 text-white p-2 rounded">เข้าสู่ระบบ</button>
    </form>
  );
}