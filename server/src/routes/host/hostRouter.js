const express = require('express');
const hostRouter = express.Router();

const hostPublicRouter = require("./public/hostPublicRouter");
const hostSecureRouter = require("./secure/hostSecureRouter");

//----------------------------------------------------------------------------------------------------------------------------------------------//

hostRouter.use("/public", hostPublicRouter);
hostRouter.use("/secure", hostSecureRouter);

//----------------------------------------------------------------------------------------------------------------------------------------------//

hostRouter.all("*", async function (_, res) {
  res.status(404).json({ error: "Not Found" });
});
  
//----------------------------------------------------------------------------------------------------------------------------------------------//


module.exports = hostRouter;