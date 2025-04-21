import React from 'react';
import { Header, Title, Group, Button } from '@mantine/core';
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <Header height={60} p="xs">
      <Group position="apart">
        <Title order={3}>TAx Pen</Title>
        <Button variant="outline" onClick={logout}>Logout</Button>
      </Group>
    </Header>
  );
}