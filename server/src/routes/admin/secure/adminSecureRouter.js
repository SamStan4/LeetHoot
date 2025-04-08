const express = require('express');
const adminSecureROuter = express.Router();

const {
} = require ("./adminSecureMethods")

/**
 * Catch all endpoint for bad requests
 */
adminSecureROuter.all("*", async function(_, res) {
  res.status(404).json({
    error: "Not Found"
  });
});

module.exports = adminSecureROuter;