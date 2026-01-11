const express = require('express');
const morgan = require('morgan');
const validateJson = require('./middleware/validateJson.middleware');

const app = express();

//  Logger first 
app.use(morgan('dev'));

//  Body parsers 
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//  JSON parse error handler 
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    return res.status(400).json({
      status: false,
      error: "Invalid JSON format"
    });
  }
  next(err);   // pass to global error handler
});

//  Custom request validators 
app.use(validateJson);

// Routes
app.get('/api/test', (req, res) => {
  res.json({
    status: true,
    message: "Test route is working!",
    environment: process.env.NODE_ENV,
    error: null
  });
});

// 404 handler 
app.use((req, res) => {
  res.status(404).json({
    status: false,
    error: "Route not found"
  });
});

// Global error handler 
app.use((err, req, res, next) => {
  console.error(err);

  res.status(err.status || 500).json({
    status: false,
    error: err.message || "Internal Server Error"
  });
});

module.exports = app;
