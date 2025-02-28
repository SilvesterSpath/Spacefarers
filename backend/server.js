require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./api/db');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const authMiddleware = require('./middleware/auth'); //  Import auth middleware
const Spacefarer = require('./models/SpacefarerSchema');
const jwt = require('jsonwebtoken');

const app = express();
app.use(cors({ origin: '*' }));
app.use(bodyParser.json());

// Connect to MongoDB
connectDB();

app.get('/spacefarers', async (req, res) => {
  try {
    const spacefarers = await Spacefarer.find();
    res.json(spacefarers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 🔐 Authenticated Route: Get a single spacefarer by ID
app.get('/spacefarers/:id', authMiddleware, async (req, res) => {
  try {
    const spacefarer = await Spacefarer.findById(req.params.id);
    if (!spacefarer) return res.status(404).json({ error: 'Not found' });
    res.json(spacefarer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 🔐 Authenticated Route: Create a new spacefarer
app.post('/spacefarers', authMiddleware, async (req, res) => {
  try {
    const spacefarer = new Spacefarer(req.body);
    await spacefarer.save();
    res.status(201).json(spacefarer);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// 🔐 Authenticated Route: Promote a spacefarer
app.post('/spacefarers/:id/promote', authMiddleware, async (req, res) => {
  try {
    const spacefarer = await Spacefarer.findById(req.params.id);
    if (!spacefarer) return res.status(404).json({ error: 'Not found' });

    spacefarer.wormholeSkill += 10;
    if (spacefarer.wormholeSkill >= 100) {
      spacefarer.position = 'Interstellar Captain';
    }

    await spacefarer.save();

    res.json({ message: `${spacefarer.name} has been promoted!`, spacefarer });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 🔐 Authenticated Route: Delete a spacefarer
app.delete('/spacefarers/:id', authMiddleware, async (req, res) => {
  try {
    await Spacefarer.findByIdAndDelete(req.params.id);
    res.json({ message: 'Spacefarer deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 🔐 Authenticated Route: Create a new spacefarer
app.post('/spacefarers', authMiddleware, async (req, res) => {
  try {
    const spacefarer = new Spacefarer(req.body);
    await spacefarer.save();
    res.status(201).json(spacefarer);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// 🔐 Generate Token (Login Simulation)
app.post('/spacefarers/login', (req, res) => {
  const { username } = req.body; // Assume login payload has username

  let userRole = 'user'; // Default role
  if (username === 'admin') userRole = 'admin'; // Give "admin" extra power

  const user = { id: '1', username, role: userRole };

  const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '1h' });

  res.json({ token });
});

// Start Server
app.listen(4004, () => console.log('🚀 Server running on port 4004'));
