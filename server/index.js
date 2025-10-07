const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const connectDB = require('./config/database');
const tasksRouter = require('./routes/tasks');

dotenv.config();

// Connect to MongoDB
connectDB();
const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(bodyParser.json());

app.use('/api/tasks', tasksRouter);

app.get('/', (req, res) => res.send({ message: 'DayMate Server Running ✅' }));

// Health check endpoint
app.get('/health', (req, res) => {
  const health = {
    status: 'OK',
    timestamp: new Date().toISOString(),
    server: 'Running',
    database: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected',
    environment: process.env.NODE_ENV || 'development'
  };
  
  const statusCode = mongoose.connection.readyState === 1 ? 200 : 503;
  res.status(statusCode).json(health);
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
