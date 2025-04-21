require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./config/database');

// โหลด models
require('./models/User');
require('./models/Document');
require('./models/Income');
require('./models/Deduction');
require('./models/PasswordReset');
require('./models/DocumentHistory');
require('./models/DeductibleDocumentType');

// โหลด routes
const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');
const docRoutes = require('./routes/document.routes');
const taxRoutes = require('./routes/tax.routes');
const dtRoutes = require('./routes/deductionType.routes');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use('/uploads', express.static('uploads'));

// เชื่อม DB
  db.authenticate()
  .then(() => console.log('DB connected'))
  .then(() => db.getQueryInterface().createDatabase(process.env.DB_NAME))
  .catch(e => console.error(e));

db.sync({ alter: true })
  .then(() => console.log('DB synced'))
  .catch(e => console.error(e));


// ใช้งาน routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/documents', docRoutes);
app.use('/api/tax', taxRoutes);
app.use('/api/deduction-types', dtRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));