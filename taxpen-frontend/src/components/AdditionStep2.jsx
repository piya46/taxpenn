import React, { useState } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';

export default function AdditionStep2() {
  const prevIncomes = JSON.parse(localStorage.getItem('incomes') || '[]');
  const [deductions, setDeductions] = useState([{ type: '', amount: '' }]);
  const navigate = useNavigate();

  const handleChange = (idx, field, value) => {
    const arr = [...deductions]; arr[idx][field] = value; setDeductions(arr);
  };
  const addRow = () => setDeductions([...deductions, { type: '', amount: '' }]);

  const handleFinish = async () => {
    // Save incomes and deductions via API or localStorage
    await api.post('/documents', { incomes: prevIncomes, deductions });
    navigate('/home');
  };

  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-lg mb-4">เพิ่มรายการลดหย่อน</h2>
      {deductions.map((ded, i) => (
        <div key={i} className="flex space-x-2 mb-2">
          <input placeholder="ประเภท" value={ded.type} onChange={e=>handleChange(i,'type',e.target.value)} className="flex-1 p-2 border rounded" />
          <input type="number" placeholder="จำนวน" value={ded.amount} onChange={e=>handleChange(i,'amount',e.target.value)} className="w-32 p-2 border rounded" />
        </div>
      ))}
      <button onClick={addRow} className="text-blue-500 mb-4">+ เพิ่มอีก</button>
      <button onClick={handleFinish} className="bg-green-500 text-white px-4 py-2 rounded">บันทึก</button>
    </div>
  )
}