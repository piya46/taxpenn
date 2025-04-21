import React, { useState } from 'react';
import { Container, Paper, Title, TextInput, PasswordInput, Button, Text } from '@mantine/core';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';

export default function RegisterPage() {
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = field => e => setForm({ ...form, [field]: e.target.value });

  const handleSubmit = async () => {
    try {
      await api.post('/auth/register', form);
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <Container size={420} mt={50}>
      <Paper p="xl" withBorder shadow="md">
        <Title align="center">Register</Title>
        <TextInput label="First Name" value={form.firstName} onChange={handleChange('firstName')} required />
        <TextInput label="Last Name" mt="md" value={form.lastName} onChange={handleChange('lastName')} required />
        <TextInput label="Email" mt="md" value={form.email} onChange={handleChange('email')} required />
        <PasswordInput label="Password" mt="md" value={form.password} onChange={handleChange('password')} required />
        {error && <Text color="red" mt="sm">{error}</Text>}
        <Button fullWidth mt="xl" onClick={handleSubmit}>Register</Button>
        <Text align="center" mt="md">
          <Link to="/login">Already have an account? Login</Link>
        </Text>
      </Paper>
    </Container>
  );
}