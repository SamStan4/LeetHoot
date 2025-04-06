const express = require('express');
const playerPublicRouter = express.Router();

const {
  generatePlayerAuthToken,
  checkGameExistance
} = require ("./playerPublicMethods")

playerPublicRouter.post("/check-game-existance", async function (req, res) {
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

/**
 * Catch all endpoint for bad requests
 */
playerPublicRouter.all("*", async function(req, res) {
  res.status(404).json({
    error: "Not Found"
  });
});

module.exports = playerPublicRouter;