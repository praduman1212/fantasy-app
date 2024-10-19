const express = require('express');
const router = express.Router();
const Team = require('../models/Team');
const Player = require('../models/Player');


router.post('/', async (req, res) => {
  const { name, players } = req.body;

  if (players.length > 11) {
    return res.status(400).json({ message: 'You can only select up to 11 players' });
  }

  let totalPoints = 0;

  try {
    const playerDocs = await Player.find({ '_id': { $in: players } });
    totalPoints = playerDocs.reduce((acc, player) => acc + player.points, 0);

    const team = new Team({ name, players, totalPoints });
    await team.save();
    res.status(201).json(team);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const team = await Team.findById(req.params.id).populate('players');
    if (!team) return res.status(404).json({ message: 'Team not found' });
    res.json(team);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
