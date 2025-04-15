const express = require('express');
const adminSecureROuter = express.Router();

const {
  getAllGames
} = require ("./adminSecureMethods")

adminSecureROuter.get("/games/all", async function (_, res) {
  try {
    const games = await getAllGames();
    const gamesJson = games.map((game) => {
      let parsedQuestions = [];
      try {
        parsedQuestions = JSON.parse(game.gameQuestions).questions;
      } catch (err) {
        console.error(`Failed to parse questions for gameID ${game.gameID}`, err);
      }
      return {
        ...game,
        gameQuestions: parsedQuestions,
      };
    });
    return res.status(200).json({
      games: gamesJson
    })
  } catch (err) {
    return res.status(500).json({
      error: err.message
    })
  }
});

/**
 * Catch all endpoint for bad requests
 */
adminSecureROuter.all("*", async function(_, res) {
  res.status(404).json({
    error: "Not Found"
  });
});

module.exports = adminSecureROuter;