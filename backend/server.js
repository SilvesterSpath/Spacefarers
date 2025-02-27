const express = require('express');
const connectDB = require('./api/db');
const cors = require('cors');
const bodyParser = require('body-parser');
const Spacefarer = require('./models/SpacefarerSchema');

const app = express();

// 🔥 Enable CORS for all requests
app.use(cors({ origin: '*' }));

app.use(bodyParser.json());

connectDB(); // Connect to MongoDB

// Get all spacefarers
app.get('/spacefarers', async (req, res) => {
  const spacefarers = await Spacefarer.findAll();
  res.json(spacefarers);
});

// Add a new spacefarer
app.post('/spacefarers', async (req, res) => {
  const spacefarer = await Spacefarer.create(req.body);
  res.status(201).json(spacefarer);
});

// Promote a spacefarer
app.post('/spacefarers/:id/promote', async (req, res) => {
  const spacefarer = await Spacefarer.findByPk(req.params.id);
  if (!spacefarer) return res.status(404).json({ error: 'Not found' });

  spacefarer.wormholeSkill += 10;
  await spacefarer.save();

  res.json({ message: `${spacefarer.name} is now an Interstellar Captain!` });
});

// Start the server
app.listen(4004, () => console.log('🚀 Server running on port 4004'));
