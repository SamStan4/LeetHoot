const express = require('express');

const playerPublicRouterFactory = require("./public/playerPublicRouter");
const playerSecureRouterFactory = require("./secure/playerSecureRouter");

//----------------------------------------------------------------------------------------------------------------------------------------------//

module.exports = function (io) {
  const playerRouter = express.Router();
  playerRouter.use("/public", playerPublicRouterFactory(io));
  playerRouter.use("/secure", playerSecureRouterFactory(io));

  playerRouter.all("*", async function (_, res) {
    res.status(404).json({
      error: "Not Found"
    });
  });

  return playerRouter;
}