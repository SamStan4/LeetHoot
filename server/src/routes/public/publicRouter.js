const express = require('express');
const publicRouter = express();

const {
  fetchAllQuestions,
  checkGameExistance,
  checkNameAvailability
} = require("./publicMethods");

//----------------------------------------------------------------------------------------------------------------------------------------------//

publicRouter.get("/get-all-problems", async function (_, res) {
  try {
    const data = (await fetchAllQuestions()).map((problem) => {
      return {
        problemName: problem.id,
        problemDifficulty: problem.metadata.difficulty
      };
    });
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

publicRouter.post("/check-game-existance", async function (req, res) {
  try {
    const { gameID } = req.body;
    const data = await checkGameExistance(gameID);
    res.status(200).json({
      status: data
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

publicRouter.post("/check-name-availability", async function (req, res) {
  try {
    const { gameID, playerName } = req.body;
    const data = await checkNameAvailability(gameID, playerName);
    res.status(200).json({ status: data });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

publicRouter.all("*", async function (_, res) {
  res.status(404).json({ error: "Not Found" });
});

//----------------------------------------------------------------------------------------------------------------------------------------------//

module.exports = publicRouter;