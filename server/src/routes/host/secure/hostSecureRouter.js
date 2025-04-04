const express = require('express');
const hostSecureRouter = express.Router();

const {
} = require ("./hostSecureMethods")

/**
 * Catch all endpoint for bad requests
 */
hostSecureRouter.all("*", async function(_, res) {
  res.status(404).json({
    error: "Not Found"
  });
});

module.exports = hostSecureRouter;