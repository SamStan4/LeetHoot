const express = require('express');
const playerSecureRouter = express.Router();

const {} = require("./playerSecureMethods");

playerSecureRouter.all("*", async function(req, res) {
  res.status(404).json({
    error: "Not Found"
  });
});

module.exports = playerSecureRouter;