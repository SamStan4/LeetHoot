const express = require('express');
const adminRouter = express.Router();

const adminPublicRouter = require("./public/adminPublicRouter");
const adminSecureRouter = require("./secure/adminSecureRouter");

//----------------------------------------------------------------------------------------------------------------------------------------------//

adminRouter.use("/public", adminPublicRouter);
adminRouter.use("/secure", adminSecureRouter);

//----------------------------------------------------------------------------------------------------------------------------------------------//

adminRouter.all("*", async function(_, res) {
  res.status(404).json({
    error: "Not Found"
  });
});

//----------------------------------------------------------------------------------------------------------------------------------------------//

module.exports = adminRouter;