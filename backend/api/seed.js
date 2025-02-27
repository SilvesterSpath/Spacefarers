const mongoose = require('mongoose');
const Spacefarer = require('../models/SpacefarerSchema');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const spacefarers = [
  {
    name: 'Zylo Korr',
    stardustCollection: 1500,
    wormholeSkill: 85,
    originPlanet: 'Xenon Prime',
    spacesuitColor: 'Silver',
    department: 'Exploration',
    position: 'Commander',
  },
  {
    name: 'Liora Vex',
    stardustCollection: 2300,
    wormholeSkill: 95,
    originPlanet: 'Nebulon V',
    spacesuitColor: 'Gold',
    department: 'Science',
    position: 'Astrobiologist',
  },
  {
    name: 'Drax Thal',
    stardustCollection: 800,
    wormholeSkill: 70,
    originPlanet: 'Andromeda-7',
    spacesuitColor: 'Black',
    department: 'Security',
    position: 'Guardian',
  },
  {
    name: "Seren Q'tar",
    stardustCollection: 1200,
    wormholeSkill: 78,
    originPlanet: 'Epsilon Eridani',
    spacesuitColor: 'Blue',
    department: 'Engineering',
    position: 'Systems Engineer',
  },
];

async function seedDB() {
  await Spacefarer.deleteMany({});
  await Spacefarer.insertMany(spacefarers);
  console.log('🌌 Sample spacefarers inserted!');
  mongoose.connection.close();
}

seedDB();
