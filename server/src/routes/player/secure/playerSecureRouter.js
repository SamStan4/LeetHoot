const express = require('express');

const {
  verifyPlayerAuthToken,
  getCurrentQuestion,
  fetchGameState,
  runCode,
  submitCode
} = require("./playerSecureMethods");

module.exports = function (io) {
  const playerSecureRouter = express.Router();

  playerSecureRouter.use("*", async function (req, res, next) {
    if (process.env.SKIP_AUTH === "true") return next();
  
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Missing or malformed Authorization header" });
    }
  
    const token = authHeader.split(" ")[1];
    const gameID = req.body?.gameID || req.query?.gameID || req.params?.gameID;
    const playerName = req.body?.playerName || req.query?.playerName || req.params?.playerName;
    
    const decoded = await verifyPlayerAuthToken(token, gameID, playerName);
    if (!decoded) {
      return res.status(403).json({ error: "Forbidden: Invalid player token or mismatched identity" });
    }
  
    req.player = decoded;
    next();
  });

  playerSecureRouter.post("/get-current-problem", async function (req, res) {
    try {
      const { gameID } = req.body;
      const problemName = await getCurrentQuestion(gameID);
      res.status(200).json({
        problemName: problemName
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({
        error: err.message
      });
    }
  });

  playerSecureRouter.get("/game-state/:gameID", async function (req, res) {
    try {
      const { gameID } = req.params;
      const state = await fetchGameState(gameID);
      return res.status(200).json({
        gameState: state
      });
    } catch (err) {
      return res.status(500).json({
        error: err.message
      });
    }
  });

  playerSecureRouter.post("/run-problem", async function (req, res) {
    try {
      const { playerCode, problemName } = req.body;
      const result = await runCode(playerCode, problemName);
      return res.status(200).json(result);
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        error: err.message
      });
    }
  });

  playerSecureRouter.post("/submit-problem", async function (req, res) {
    try {
      const { playerName, playerCode, problemName, gameID } = req.body;
      const result = await submitCode(playerCode, problemName, playerName, gameID);
      return res.status(200).json({
        status: result
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        error: err.message
      });
    }
  });

  playerSecureRouter.all("*", async function(req, res) {
    res.status(404).json({
      error: "Not Found"
    });
  });

  return playerSecureRouter;
};