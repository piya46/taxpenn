// test-connection.js
require('dotenv').config({
    path: path.resolve(__dirname, '../.env')  // ชี้ไปยังไฟล์ .env ที่ root
  });
console.log('ENV VARS:', {
  DB_HOST: process.env.DB_HOST,
  DB_NAME: process.env.DB_NAME,
  DB_USER: process.env.DB_USER,
  DB_PASS: process.env.DB_PASS && '*****',
  DB_PORT: process.env.DB_PORT
});
