const express = require('express');
const adminSecureRouter = express.Router();

const {
  getAllGames,
  getGamePlayers,
  deleteGame,
  removePlayer,
  verifyAdminAuthToken
} = require ("./adminSecureMethods")

adminSecureRouter.use("*", async function (req, res, next) {
  if (process.env.SKIP_AUTH === "true") {
    return next();
  }
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Missing or invalid Authorization header" });
  }
  const token = authHeader.split(" ")[1];

  const isValid = verifyAdminAuthToken(token);

  if (!isValid) {
    return res.status(403).json({ error: "Forbidden: Invalid admin token" });
  }

  next();
});

adminSecureRouter.get("/games/all", async function (_, res) {
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

adminSecureRouter.get("/games/players/:gameID", async function (req, res) {
  try {
    const { gameID } = req.params;
    const players = await getGamePlayers(gameID);
    return res.status(200).json({
      playerList: players
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      error: err.message
    });
  }
});

adminSecureRouter.delete("/games/:gameID", async function (req, res) {
  try {
    const { gameID } = req.params;
    const status = await deleteGame(gameID);
    return res.status(200).json({
      status: status
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      error: err.message
    });
  }
});

adminSecureRouter.delete("/games/player/:gameID/:playerName", async function (req, res) {
  try {
    const { gameID, playerName } = req.params;
    const status = await removePlayer(gameID, playerName);
    return res.status(200).json({
      status: status
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      error: err
    });
  }
});

/**
 * Catch all endpoint for bad requests
 */
adminSecureRouter.all("*", async function(_, res) {
  res.status(404).json({
    error: "Not Found"
  });
});

module.exports = adminSecureRouter;