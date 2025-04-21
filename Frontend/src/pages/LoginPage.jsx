import React, { useState } from 'react';
import { Container, Paper, Title, TextInput, PasswordInput, Button, Text } from '@mantine/core';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const { data } = await api.post('/auth/login', { email, password });
      localStorage.setItem('token', data.token);
      navigate('/profile');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <Container size={420} mt={50}>
      <Paper p="xl" withBorder shadow="md">
        <Title align="center">Login</Title>
        <TextInput label="Email" placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} required />
        <PasswordInput label="Password" placeholder="Password" mt="md" value={password} onChange={e => setPassword(e.target.value)} required />
        {error && <Text color="red" mt="sm">{error}</Text>}
        <Button fullWidth mt="xl" onClick={handleSubmit}>Login</Button>
        <Text align="center" mt="md">
          <Link to="/register">Don't have an account? Register</Link>
        </Text>
      </Paper>
    </Container>
  );
}