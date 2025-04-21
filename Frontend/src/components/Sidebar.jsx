import React from 'react';
import { Box, NavLink } from '@mantine/core';
import { IconHome2, IconLogout } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';

export default function Sidebar() {
  const navigate = useNavigate();
  return (
    <Box component="nav" style={{ width: 250, padding: '1rem', background: '#fff', height: '100vh' }}>
      <NavLink
        label="Dashboard"
        icon={<IconHome2 size={16} />}
        onClick={() => navigate('/dashboard')}
      />
      <NavLink
        label="Logout"
        icon={<IconLogout size={16} />}
        onClick={() => {
          localStorage.removeItem('token');
          navigate('/login', { replace: true });
        }}
      />
    </Box>
  );
}