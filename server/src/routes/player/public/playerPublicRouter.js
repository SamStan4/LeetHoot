const express = require('express');
const playerPublicRouter = express.Router();

const {
  generatePlayerAuthToken,
  checkGameExistance,
  checkNameAvailability
} = require ("./playerPublicMethods")

playerPublicRouter.post("/check-game-existance", async function(req, res) {
  try {
    const { gameID } = req.body;
    const status = await checkGameExistance(gameID);
    res.status(200).json({
      status: status
    });
  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
});

// TODO: test this mofo more on postman
playerPublicRouter.post("/check-name-availability", async function(req, res) {
  try {
    const { gameID, playerName } = req.body;
    const status = await checkNameAvailability(gameID, playerName);
    res.json({
      status: status
    });
  } catch (err) {
    res.status(500).json({
      error: err.message
    })
  }
});

/**
 * Catch all endpoint for bad requests
 */
playerPublicRouter.all("*", async function(req, res) {
  res.status(404).json({
    error: "Not Found"
  });
});

module.exports = playerPublicRouter;