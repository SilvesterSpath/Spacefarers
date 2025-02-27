const express = require('express');
const connectDB = require('./api/db');
const cors = require('cors');
const bodyParser = require('body-parser');
const Spacefarer = require('./models/SpacefarerSchema');
const mongoose = require('mongoose');

const app = express();

// 🔥 Enable CORS for all requests
app.use(cors({ origin: '*' }));

app.use(bodyParser.json());

connectDB(); // Connect to MongoDB

// Get all spacefarers
app.get('/spacefarers', async (req, res) => {
  const spacefarers = await Spacefarer.find();
  res.json(spacefarers);
});

// Add a new spacefarer
app.post('/spacefarers', async (req, res) => {
  const spacefarer = await Spacefarer.create(req.body);
  res.status(201).json(spacefarer);
});

app.get('/spacefarers/:id', async (req, res) => {
  try {
    const { id } = req.params;
    console.log('Fetching Spacefarer with ID:', id); // Debugging

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid ID format' });
    }

    const spacefarer = await Spacefarer.findById(id);
    if (!spacefarer) {
      return res.status(404).json({ error: 'Spacefarer not found' });
    }

    res.json(spacefarer);
  } catch (error) {
    console.error('Error fetching spacefarer:', error);
    res.status(500).json({ error: error.message });
  }
});

app.post('/spacefarers/:id/promote', async (req, res) => {
  try {
    const { id } = req.params;
    console.log(`Promoting Spacefarer with ID: ${id}`);

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid ID format' });
    }

    const spacefarer = await Spacefarer.findById(id);
    if (!spacefarer) {
      return res.status(404).json({ error: 'Spacefarer not found' });
    }

    // Store old skill and rank for reference
    const oldSkill = spacefarer.wormholeSkill;
    const oldRank = spacefarer.position;

    // Increase skill and promote rank
    spacefarer.wormholeSkill += 10;

    if (spacefarer.wormholeSkill >= 100) {
      spacefarer.position = 'Interstellar Captain';
    } else if (spacefarer.wormholeSkill >= 80) {
      spacefarer.position = 'Elite Navigator';
    } else if (spacefarer.wormholeSkill >= 50) {
      spacefarer.position = 'Galactic Officer';
    }

    await spacefarer.save();

    res.json({
      message: `${spacefarer.name} has been promoted!`,
      oldSkill,
      newSkill: spacefarer.wormholeSkill,
      oldRank,
      newRank: spacefarer.position,
      spacefarer,
    });
  } catch (error) {
    console.error('Error promoting spacefarer:', error);
    res.status(500).json({ error: error.message });
  }
});

// Start the server
app.listen(4004, () => console.log('🚀 Server running on port 4004'));
