const express = require('express');

const {
  verifyHostAuthToken,
  getCurrentQuestion,
  incrementQuestionIdx,
  fetchGameState,
  getLeaderBoard,
  deleteGame
} = require ("./hostSecureMethods");

module.exports = function(io) {
  const hostSecureRouter = express.Router();

  hostSecureRouter.use("*", async function (req, res, next) {
    if (process.env.SKIP_AUTH === "true") {
      return next();
    }
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        error: "Missing or malformed Authorization header"
      });
    }
    const token = authHeader.split(" ")[1];
    const gameID = req.body?.gameID || req.query?.gameID || req.params?.gameID;

    const isValid = await verifyHostAuthToken(token, gameID);
    if (!isValid) {
      return res.status(403).json({
        error: "Forbidden: Invalid host token or mismatched gameID"
      });
    }
    next();
  });

  hostSecureRouter.post("/get-current-problem", async function (req, res) {
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

  hostSecureRouter.post("/increment-game-idx", async function (req, res) {
    try {
      const { gameID } = req.body;
      const result = await incrementQuestionIdx(gameID);
      if (result) {
        io.to(gameID).emit("update-game-state");
      }
      res.status(200).json({
        status: result
      });
    } catch (err) {
      res.status(500).json({
        error: err.message
      });
    }
  });

  hostSecureRouter.get("/game-state/:gameID", async function (req, res) {
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

  hostSecureRouter.get("/leader-board/:gameID", async function (req, res) {
    try {
      const { gameID } = req.params;
      const players = await getLeaderBoard(gameID);
      console.log(players);
      return res.status(200).json({
        leaderBoard: players
      });
    } catch (err) {
      return res.status(500).json({
        error: err.message
      });
    }
  });

  hostSecureRouter.delete("/end-game/:gameID", async function (req, res) {
    try {
      const { gameID } = req.params;
      const success = await deleteGame(gameID);
      io.to(gameID).emit("game-end");
      return res.status(200).json({
        success: success
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        error: err.message
      });
    }
  });

  hostSecureRouter.all("*", async function(_, res) {
    res.status(404).json({
      error: "Not Found"
    });
  });

  return hostSecureRouter;
};