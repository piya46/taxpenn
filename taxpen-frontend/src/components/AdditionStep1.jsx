import React, { useState } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';

export default function AdditionStep1() {
  const [incomes, setIncomes] = useState([{ type: '', amount: '' }]);
  const navigate = useNavigate();

  const handleChange = (idx, field, value) => {
    const arr = [...incomes]; arr[idx][field] = value; setIncomes(arr);
  };
  const addRow = () => setIncomes([...incomes, { type: '', amount: '' }]);

  const handleNext = () => {
    localStorage.setItem('incomes', JSON.stringify(incomes));
    navigate('/addition/2');
  };

  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-lg mb-4">เพิ่มรายได้</h2>
      {incomes.map((inc, i) => (
        <div key={i} className="flex space-x-2 mb-2">
          <input placeholder="ประเภท" value={inc.type} onChange={e=>handleChange(i,'type',e.target.value)} className="flex-1 p-2 border rounded" />
          <input type="number" placeholder="จำนวน" value={inc.amount} onChange={e=>handleChange(i,'amount',e.target.value)} className="w-32 p-2 border rounded" />
        </div>
      ))}
      <button onClick={addRow} className="text-blue-500 mb-4">+ เพิ่มอีก</button>
      <button onClick={handleNext} className="bg-green-500 text-white px-4 py-2 rounded">ถัดไป</button>
    </div>
  )
}