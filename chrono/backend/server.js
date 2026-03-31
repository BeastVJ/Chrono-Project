const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// ✅ Middleware
app.use(cors());
app.use(express.json());

// ✅ Test Route (IMPORTANT for checking deployment)
app.get('/', (req, res) => {
  res.send('Backend is running 🚀');
});

// ✅ Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/teachers', require('./routes/teachers'));
app.use('/api/subjects', require('./routes/subjects'));
app.use('/api/classes', require('./routes/classes'));
app.use('/api/classrooms', require('./routes/classrooms'));
app.use('/api/timeslots', require('./routes/timeslots'));
app.use('/api/timetable', require('./routes/timetable'));
app.use('/api/export', require('./routes/export'));

// ✅ MongoDB Connection + Server Start
const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected ✅');

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('MongoDB connection error ❌:', err);
  });
