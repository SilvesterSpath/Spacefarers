const mongoose = require('mongoose');

const SpacefarerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  stardustCollection: { type: Number, default: 0 }, // Stardust collected
  wormholeSkill: { type: Number, default: 50 }, // Skill level (0-100)
  originPlanet: { type: String, required: true },
  spacesuitColor: { type: String, required: true },
  department: {
    type: String,
    enum: ['Exploration', 'Science', 'Engineering', 'Security'],
    required: true,
  },
  position: { type: String, default: 'Cadet' },
  joinedDate: { type: Date, default: Date.now },
});

const Spacefarer = mongoose.model('Spacefarer', SpacefarerSchema);

module.exports = Spacefarer;
