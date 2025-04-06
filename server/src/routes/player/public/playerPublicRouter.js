const express = require('express');
const playerPublicRouter = express.Router();

const {
  generatePlayerAuthToken
} = require ("./playerPublicMethods")

/**
 * Catch all endpoint for bad requests
 */
playerPublicRouter.all("*", async function(req, res) {
  res.status(404).json({
    error: "Not Found"
  });
});

module.exports = playerPublicRouter;