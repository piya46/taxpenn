import React from 'react';
import { Navbar as MantineNavbar, NavLink } from '@mantine/core';
import { useNavigate } from 'react-router-dom';

export default function Sidebar() {
  const navigate = useNavigate();
  return (
    <MantineNavbar width={{ base: 200 }} p="xs">
      <NavLink label="Profile" onClick={() => navigate('/profile')} />
      <NavLink label="Upload" onClick={() => navigate('/upload')} />
      <NavLink label="History" onClick={() => navigate('/history')} />
      <NavLink label="Tax Calc" onClick={() => navigate('/tax')} />
      <NavLink label="Deductions" onClick={() => navigate('/deductions')} />
    </MantineNavbar>
  );
}