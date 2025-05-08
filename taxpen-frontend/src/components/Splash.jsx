import React from 'react';
export default function Splash({ onContinue }) {
  return (
    <div className="flex items-center justify-center h-screen bg-white">
      <img src="/logo.png" alt="Tax Pen" className="w-32 mb-4" />
      <button onClick={onContinue} className="bg-green-500 text-white px-6 py-2 rounded">เริ่มต้นใช้งาน</button>
    </div>
  );
}