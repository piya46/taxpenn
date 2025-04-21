const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { Op } = require('sequelize');
const User = require('../models/User');
const PasswordReset = require('../models/PasswordReset');
const sgMail = require('../config/mailer');

// src/controllers/auth.controller.js
exports.register = async (req, res) => {
    try {
      const { firstName, lastName, email, password } = req.body;
      const hash = await bcrypt.hash(password, 10);
      const user = await User.create({ firstName, lastName, email, password: hash });
      return res.status(201).json({ userId: user.userId });
    } catch (err) {
      console.error('REGISTER ERROR:', err);
      // ส่งกลับ status และข้อความจริง ๆ ของข้อผิดพลาด
      return res.status(500).json({ message: err.message });
    }
  };
  

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email } });
  if (!user || !await bcrypt.compare(password, user.password)) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  const token = jwt.sign({ userId: user.userId, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.json({ token });
};

exports.forgotPassword = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ where: { email } });
  if (!user) return res.status(404).json({ message: 'User not found' });

  const otp = crypto.randomInt(100000, 999999).toString();
  const expiresAt = new Date(Date.now() + 15 * 60 * 1000);
  await PasswordReset.create({ UserId: user.userId, otp, expiresAt });

  const msg = {
    to: email,
    from: process.env.MAIL_FROM,
    subject: 'TAx pen Password Reset OTP',
    text: `Your OTP code is ${otp}. Expires in 15 minutes.`
  };
  await sgMail.send(msg);

  res.json({ message: 'OTP sent to email' });
};

exports.resetPassword = async (req, res) => {
  const { email, otp, newPassword } = req.body;
  const user = await User.findOne({ where: { email } });
  if (!user) return res.status(404).json({ message: 'User not found' });

  const record = await PasswordReset.findOne({
    where: {
      UserId: user.userId,
      otp,
      used: false,
      expiresAt: { [Op.gt]: new Date() }
    }
  });
  if (!record) return res.status(400).json({ message: 'Invalid or expired OTP' });

  user.password = await bcrypt.hash(newPassword, 10);
  await user.save();
  record.used = true;
  await record.save();

  res.json({ message: 'Password reset successful' });
};