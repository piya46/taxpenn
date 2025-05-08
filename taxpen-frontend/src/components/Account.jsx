import React, { useEffect, useState } from 'react';
import api from '../api';

export default function Account() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    api.get('/users/me').then(res => setUser(res.data));
  }, []);
  if (!user) return <p>Loading...</p>;

  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-lg mb-4">บัญชีของฉัน</h2>
      <p>ชื่อ: {user.firstName} {user.lastName}</p>
      <p>Email: {user.email}</p>
    </div>
  );
}
