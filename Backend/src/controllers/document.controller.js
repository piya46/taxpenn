const multer = require('multer');
const path = require('path');
const Document = require('../models/Document');
const DocumentHistory = require('../models/DocumentHistory');

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});

const upload = multer({ storage });

exports.uploadDocument = [
  upload.single('file'),
  async (req, res) => {
    const doc = await Document.create({
      file: req.file.filename,
      isIncome: req.body.isIncome,
      UserId: req.user.userId
    });
    await DocumentHistory.create({ action: 'uploaded', DocumentId: doc.id, UserId: req.user.userId });
    res.status(201).json(doc);
  }
];

exports.editDocument = async (req, res) => {
  const doc = await Document.findByPk(req.params.id);
  if (!doc) return res.status(404).json({ message: 'Not found' });
  await doc.update(req.body);
  await DocumentHistory.create({ action: 'edited', DocumentId: doc.id, UserId: req.user.userId });
  res.json(doc);
};

exports.getHistory = async (req, res) => {
  const history = await DocumentHistory.findAll({ where: { DocumentId: req.params.id } });
  res.json(history);
};