// userService.js

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// MongoDB setup (replace 'your_mongo_uri' with your actual MongoDB URI)
mongoose.connect('your_mongo_uri', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Define User schema
const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
});

const User = mongoose.model('User', userSchema);

// Middleware for parsing JSON
app.use(bodyParser.json());

// Endpoint for creating a new user
app.post('/users', async (req, res) => {
  try {
    const newUser = new User(req.body);
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// Endpoint for retrieving all users
app.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`User Service running on http://localhost:${PORT}`);
});
