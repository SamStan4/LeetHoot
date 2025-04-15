const express = require('express');
const adminPublicRouter = express.Router();

const {
  generateAdminAuthToken,
  adminLogin,
  createAdminUser
} = require ("./adminPublicMethods")

adminPublicRouter.post("/login", async function (req, res) {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({
        error: "Missing username or password"
      });
    }
    const result = await adminLogin(username, password);
    let authToken = null;
    if (result) {
      authToken = generateAdminAuthToken(username);
    }
    res.status(200).json({
      result: result,
      token: authToken
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      error: err.message
    });
  }
});

// adminPublicRouter.post("/set", async function (req, res) {
//   try {
//     const {username, password} = req.body;
//     const result = await createAdminUser(username, password);
//     return res.status(200).json({
//       status: result
//     });
//   } catch (err) {
//     console.error(err);
//     return res.status(500).json({
//       error: err.message
//     });
//   }
// });

/**
 * Catch all endpoint for bad requests
 */
adminPublicRouter.all("*", async function(_, res) {
  res.status(404).json({
    error: "Not Found"
  });
});

module.exports = adminPublicRouter;