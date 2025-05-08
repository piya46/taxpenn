import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api';

export default function EditDocument() {
  const { id } = useParams();
  const [doc, setDoc] = useState(null);
  const [isIncome, setIsIncome] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    api.get(`/documents/${id}`).then(res => {
      setDoc(res.data);
      setIsIncome(res.data.isIncome);
    });
  }, [id]);

  const handleSave = async () => {
    await api.put(`/documents/${id}`, { isIncome });
    navigate('/documents');
  };

  if (!doc) return <p>Loading...</p>;
  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-lg mb-4">แก้ไขเอกสาร</h2>
      <p className="mb-2">ไฟล์: {doc.file}</p>
      <label className="flex items-center mb-4">
        <input type="checkbox" checked={isIncome} onChange={e => setIsIncome(e.target.checked)} className="mr-2" />
        เป็นรายได้
      </label>
      <button onClick={handleSave} className="bg-green-500 text-white px-4 py-2 rounded">บันทึก</button>
    </div>
  )
}