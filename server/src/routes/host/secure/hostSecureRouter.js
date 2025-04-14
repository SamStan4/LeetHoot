const express = require('express');
const hostSecureRouter = express.Router();

const {
  verifyHostAuthToken,
  getCurrentQuestion,
  incrementQuestionIdx
} = require ("./hostSecureMethods")

// hostSecureRouter.use("*", async function (req, res, next) {
//   try {
//     const authHeader = req.headers.authorization;
//     const { gameID } = req.body;
//     if (!authHeader || !authHeader.startsWith("Bearer ")) {
//       return res.status(401).json({
//         error: "missing or malformed auth header"
//       });
//     } else if (!gameID) {
//       return res.status(400).json({
//         error: "missing gameID"
//       });
//     }
//     const token = authHeader.split(" ")[1];
//     const result = await verifyHostAuthToken(token, gameID);
//     if (result.valid) {
//       req.user = result.payload;
//       next();
//     } else {
//       return res.status(401).json({
//         error: result.error
//       });
//     }
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({
//       error: err.message
//     });
//   }
// });

hostSecureRouter.post("/get-current-problem", async function (req, res) {
  try {
    const { gameID } = req.body;
    const problemName = await getCurrentQuestion(gameID);
    res.status(200).json({
      problemName: problemName
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: err.message
    });
  }
});

hostSecureRouter.post("/increment-game-idx", async function (req, res) {
  try {
    const { gameID } = req.body;
    const result = await incrementQuestionIdx(gameID);
    res.status(200).json({
      status: result
    });
  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
});

/**
 * Catch all endpoint for bad requests
 */
hostSecureRouter.all("*", async function(_, res) {
  res.status(404).json({
    error: "Not Found"
  });
});

module.exports = hostSecureRouter;