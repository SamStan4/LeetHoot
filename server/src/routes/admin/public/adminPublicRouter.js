const express = require('express');
const adminPublicRouter = express.Router();

const {
} = require ("./adminPublicMethods")

/**
 * Catch all endpoint for bad requests
 */
adminPublicRouter.all("*", async function(_, res) {
  res.status(404).json({
    error: "Not Found"
  });
});

module.exports = adminPublicRouter;