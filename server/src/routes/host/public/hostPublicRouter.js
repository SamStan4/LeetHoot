const express = require('express');
const hostPublicRouter = express.Router();

const {
} = require ("./hostPublicMethods")

/**
 * Catch all endpoint for bad requests
 */
hostPublicRouter.all("*", async function(_, res) {
  res.status(404).json({
    error: "Not Found"
  });
});

module.exports = hostPublicRouter;