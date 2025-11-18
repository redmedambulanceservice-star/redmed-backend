const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const MONGODB_URI = 'mongodb+srv://redmedambulanceservice_db_user:I7Woyj7je2uxjF20@cluster0.3imb5e5.mongodb.net/redmed_ambulance';

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB Connected!'))
.catch(err => console.log('❌ MongoDB Error:', err));

// Health Check
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: '🚑 RedMed API Running on Render!',
    database: mongoose.connection.readyState === 1 ? 'Connected ✅' : 'Disconnected ❌',
    timestamp: new Date().toISOString()
  });
});

// Test Route
app.get('/api/test', (req, res) => {
  res.json({ 
    success: true, 
    message: 'RedMed API Test Successful!' 
  });
});

// OTP Test Route
app.post('/api/send-otp', (req, res) => {
  res.json({
    success: true,
    message: 'OTP system ready for Twilio integration'
  });
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`🚀 RedMed Server running on port ${PORT}`);
});