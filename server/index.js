// app.js or server.js

const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes/route.js');

const app = express();
const PORT = process.env.PORT || 5000;

// MongoDB setup
mongoose.connect('mongodb://localhost:27017/mydatabase', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.once('open', () => console.log('Connected to MongoDB'));

// Middleware
app.use(express.json());

// Routes
app.use('/api', routes); // Mount the router at '/api'

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
