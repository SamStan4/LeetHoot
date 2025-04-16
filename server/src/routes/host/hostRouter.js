const express = require('express');

const hostPublicRouterFactory = require("./public/hostPublicRouter");
const hostSecureRouterFactory = require("./secure/hostSecureRouter");

//----------------------------------------------------------------------------------------------------------------------------------------------//

module.exports = function (io) {
  const hostRouter = express.Router();
  hostRouter.use("/public", hostPublicRouterFactory(io));
  hostRouter.use("/secure", hostSecureRouterFactory(io));

  hostRouter.all("*", async function (_, res) {
    res.status(404).json({ error: "Not Found" });
  });

  return hostRouter;
};