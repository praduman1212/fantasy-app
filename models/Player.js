const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, enum: ['Batsman', 'Bowler', 'All-rounder'], required: true },
  points: { type: Number, required: true },
});

module.exports = mongoose.model('Player', playerSchema);
