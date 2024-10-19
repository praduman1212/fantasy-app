// routes/teams.js

const express = require('express');
const router = express.Router();
const Team = require('../models/Team'); // Assuming you have a Team model

// POST /api/teams - Create a new team
router.post('/', async (req, res) => {
  const { name, players } = req.body;

  // Ensure the team has players
  if (!players || players.length === 0) {
    return res.status(400).json({ message: 'Team must have at least one player' });
  }

  try {
    const newTeam = new Team({
      name,
      players
    });
    await newTeam.save();
    res.status(201).json(newTeam);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/teams/:id - Retrieve a specific team by ID
router.get('/:id', async (req, res) => {
  try {
    const team = await Team.findById(req.params.id);
    if (!team) return res.status(404).json({ message: 'Team not found' });
    res.json(team);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
