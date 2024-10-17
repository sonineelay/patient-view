const express = require('express');
const connectDB = require('./config/db');
const patientRoutes = require('./routes/patientRoutes');
const authRoutes = require('./routes/authRoutes');
const errorHandler = require('./middlewares/errorHandler');
require('dotenv').config();

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json()); // For parsing application/json

// Routes
app.use('/api/patients', patientRoutes);
app.use('/api/authorizations', authRoutes);

// Error handling middleware
app.use(errorHandler);

module.exports = app;
