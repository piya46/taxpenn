import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';

export default function Documents() {
  const [docs, setDocs] = useState([]);
  useEffect(() => { api.get('/documents').then(res=>setDocs(res.data)); }, []);

  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-lg mb-4">เอกสารของฉัน</h2>
      <Link to="/scan" className="text-blue-500 mb-4 inline-block">สแกนเอกสารใหม่</Link>
      <ul>
        {docs.map(d=> (
          <li key={d.id} className="mb-2">
            <Link to={`/documents/${d.id}/edit`} className="text-blue-700 underline">{d.file}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}