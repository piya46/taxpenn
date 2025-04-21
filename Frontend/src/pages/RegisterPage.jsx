import React, { useState } from 'react';
import { Button, TextInput, PasswordInput, Card } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

export default function RegisterPage() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.post('/auth/register', { firstName, lastName, email, password });
    navigate('/login', { replace: true });
  };

  return (
    <Card shadow="sm" padding="lg" style={{ maxWidth: 400, margin: 'auto', marginTop: '10%' }}>
      <form onSubmit={handleSubmit}>
        <TextInput label="First Name" required value={firstName} onChange={(e) => setFirstName(e.target.value)} />
        <TextInput label="Last Name" mt="md" required value={lastName} onChange={(e) => setLastName(e.target.value)} />
        <TextInput label="Email" placeholder="you@example.com" mt="md" required value={email} onChange={(e) => setEmail(e.target.value)} />
        <PasswordInput label="Password" mt="md" required value={password} onChange={(e) => setPassword(e.target.value)} />
        <Button fullWidth mt="xl" type="submit">Register</Button>
      </form>
    </Card>
  );
}