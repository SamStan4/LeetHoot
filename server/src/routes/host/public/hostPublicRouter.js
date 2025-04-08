const express = require('express');
const hostPublicRouter = express.Router();

const {
  fetchAllQuestions,
  registerNewGame,
  generateHostAuthToken,
  getProblemDetails
} = require ("./hostPublicMethods")

hostPublicRouter.get("/get-all-problems", async function (_, res) {
  try {
    const data = await fetchAllQuestions();
    res.status(200).json({
      problems: data
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: err.message
    });
  }
});

// TODO: test this endpoint wher there are more problems in the db
hostPublicRouter.post("/register-new-game", async function(req, res) {
  try {
    const { questionList } = req.body;
    const newGameID = await registerNewGame(questionList);
    const newJwtAuth = await generateHostAuthToken(newGameID);
    res.status(201).json({
      gameID: newGameID,
      hostToken: newJwtAuth
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: err.message
    });
  }
});

hostPublicRouter.post("/get-problem-details", async function(req, res) {
  try {
    const { problemName } = req.body;
    const details = await getProblemDetails(problemName);
    res.status(200).json({
      problemDetails: details
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: err.message
    })
  }
});

hostPublicRouter.all("*", async function(_, res) {
  res.status(404).json({
    error: "Not Found"
  });
});

module.exports = hostPublicRouter;