const express = require('express');
const hostPublicRouter = express.Router();

const {
  fetchAllQuestions
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

hostPublicRouter.all("*", async function(_, res) {
  res.status(404).json({
    error: "Not Found"
  });
});

module.exports = hostPublicRouter;