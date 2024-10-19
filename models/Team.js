const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
  name: { type: String, required: true },
  players: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Player', required: true }],
  totalPoints: { type: Number, default: 0 },
});

module.exports = mongoose.model('Team', teamSchema);
