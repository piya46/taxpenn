const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.authenticate = async (req, res, next) => {
  const header = req.headers.authorization;
  if (!header) return res.status(401).json({ message: 'No token provided' });
  const token = header.split(' ')[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findByPk(payload.userId);
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

exports.authorize = roles => (req, res, next) => {
  if (!roles.includes(req.user.role)) return res.status(403).json({ message: 'Forbidden' });
  next();
};