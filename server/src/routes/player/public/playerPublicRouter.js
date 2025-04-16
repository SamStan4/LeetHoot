const express = require('express');

const {
  generatePlayerAuthToken,
  checkGameExistance,
  checkNameAvailability,
  registerPlayerForGame
} = require ("./playerPublicMethods")

module.exports = function (io) {
  const playerPublicRouter = express.Router();

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

  playerPublicRouter.post("/register-player", async function(req, res) {
    try {
      const { gameID, playerName } = req.body;
      const nameStatus = await checkNameAvailability(gameID, playerName);
      const gameStatus = await checkGameExistance(gameID);
      if (!nameStatus || !gameStatus) {
        return res.status(200).json({
          status: false
        });
      }
      const { status } = await registerPlayerForGame(gameID, playerName);
      if (!status) {
        return res.status(200).json({
          status: false
        });
      }
      const newJwtAuth = await generatePlayerAuthToken(gameID, playerName);
      res.status(200).json({
        status: true,
        playerToken: newJwtAuth
      })
    } catch (err) {
      console.error(err);
      res.status(500).json({
        error: err.message
      });
    }
  });

  playerPublicRouter.all("*", async function(req, res) {
    res.status(404).json({
      error: "Not Found"
    });
  });
  
  return playerPublicRouter;
};