const express = require('express');
const playerSecureRouter = express.Router();

const {
  verifyPlayerAuthToken
} = require("./playerSecureMethods");

playerSecureRouter.use("*", async function (req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    const { playerName, gameID } = req.body;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        error: "missing or malformed auth header"
      });
    } else if (!playerName || !gameID) {
      return res.status(400).json({
        error: "missing playerName or gameID"
      });
    }
    const token = authHeader.split(" ")[1];
    const result = await verifyPlayerAuthToken(token, gameID, playerName);
    if (result.valid) {
      req.user = result.payload;
      next();
    } else {
      return res.status(401).json({
        error: result.error
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: err.message
    });
  }
});

playerSecureRouter.all("*", async function(req, res) {
  res.status(404).json({
    error: "Not Found"
  });
});

module.exports = playerSecureRouter;