import React, { useState } from 'react';
import { Button, TextInput, PasswordInput, Card } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data } = await api.post('/auth/login', { email, password });
    localStorage.setItem('token', data.token);
    navigate('/dashboard', { replace: true });
  };

  return (
    <Card shadow="sm" padding="lg" style={{ maxWidth: 400, margin: 'auto', marginTop: '10%' }}>
      <form onSubmit={handleSubmit}>
        <TextInput
          label="Email"
          placeholder="you@example.com"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <PasswordInput
          label="Password"
          placeholder="Your password"
          required
          mt="md"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button fullWidth mt="xl" type="submit">
          Login
        </Button>
      </form>
    </Card>
  );
}