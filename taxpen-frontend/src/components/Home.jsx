// src/components/Home.jsx
import React, { useEffect, useState } from 'react';
import api from '../api';

export default function Home() {
  const [stats, setStats] = useState({
    tax: 0,
    currentDed: 0,
    recDed: 0,
  });

  useEffect(() => {
    async function load() {
      try {
        // 1) คำนวณภาษี
        const { data: calc } = await api.post('/tax/calculate', {
          incomes: [],
          deductions: [],
        });
        // 2) หักลดหย่อนปัจจุบัน
        const { data: cur } = await api.post('/tax/current-deduction', {
          deductions: [],
        });
        // 3) แนะนำลดหย่อน
        const { data: rec } = await api.post('/tax/rec-deduction', {
          incomes: [],
        });

        setStats({
          tax: calc.tax ?? 0,
          currentDed: cur.currentDeduction ?? 0,
          recDed: rec.recDeduction ?? 0,
        });
      } catch (e) {
        console.warn('Home load error, defaulting to zeros:', e);
        // leave stats as {0,0,0}
      }
    }

    load();
  }, []);

  return (
    <div className="space-y-4">
      <div className="p-4 bg-white rounded shadow text-center">
        <p className="text-lg">ภาษีที่ต้องชำระ</p>
        <p className="text-2xl text-green-600">{stats.tax} บาท</p>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 bg-green-100 rounded">
          <p>ลดหย่อนปัจจุบัน</p>
          <p className="text-xl">{stats.currentDed} บาท</p>
        </div>
        <div className="p-4 bg-green-100 rounded">
          <p>แนะนำลดหย่อน</p>
          <p className="text-xl">{stats.recDed} บาท</p>
        </div>
      </div>
    </div>
  );
}
