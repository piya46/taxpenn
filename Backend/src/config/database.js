// src/config/database.js
require('dotenv').config();                 // ← ต้องอยู่บรรทัดแรกสุด

// ➤ ดีบั๊กดูค่าว่าอ่านมาได้ไหม
console.log('DB CONFIG:', {
  DB_NAME: process.env.DB_NAME,
  DB_USER: process.env.DB_USER,
  DB_PASS: process.env.DB_PASS && '*****',  // ไม่พิม์รหัสจริง
  DB_HOST: process.env.DB_HOST,
  DB_PORT: process.env.DB_PORT
});

const { Sequelize } = require('sequelize');
const sequelize = new Sequelize(
  process.env.DB_NAME,    // database name
  process.env.DB_USER,    // username
  process.env.DB_PASS,    // password
  {
    host: process.env.DB_HOST,
    port: +process.env.DB_PORT,
    dialect: 'mariadb',
    logging: console.log,  // ดู SQL ที่ Sequelize รัน
    pool: { max: 5, min: 0, idle: 10000 }
  }
);

module.exports = sequelize;
