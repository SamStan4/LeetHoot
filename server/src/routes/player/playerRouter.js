const express = require('express');
const playerRouter = express.Router();

const playerPublicRouter = require("./public/playerPublicRouter");
const playerSecureRouter = require("./secure/playerSecureRouter");

//----------------------------------------------------------------------------------------------------------------------------------------------//

playerRouter.use("/public", playerPublicRouter);
playerRouter.use("/secure", playerSecureRouter);

//----------------------------------------------------------------------------------------------------------------------------------------------//

playerRouter.all("*", async function (_, res) {
  res.status(404).json({
    error: "Not Found"
  });
});
  
//----------------------------------------------------------------------------------------------------------------------------------------------//

module.exports = playerRouter;