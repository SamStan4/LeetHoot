const express = require('express');
const adminPublicRouter = express.Router();

const {
  getGamePlayers,
  getGameSessions,
  deleteSession,
  deletePlayer
} = require ("./adminPublicMethods")

adminPublicRouter.get("/get-sessions", async function(req, res) {
  try{
    const sessions = await getGameSessions();
    if(sessions.length === 0){
      sessions = []
    }
    return res.status(200).json({
      status: true,
      sessions: sessions
    });
  }
  catch (err) {
    console.error(err);
    res.status(500).json({
      error: err.message
    });
  }
});

adminPublicRouter.post("/remove-player", function(req, res){
  try{
    const {playerName} = req.body;
    const {gameID} = req.body
    deletePlayer(playerName, gameID)
    res.status(200).json({
      status: true
    })
    console.log("success " + playerName)
  }
  catch(err){
    console.error(err)
    res.status(500).json({
      error: err.message
    })
  }
})

adminPublicRouter.post("/delete-session", function(req, res){
  try{
    const { gameID } = req.body;
    //const gameID = 18
    const val = deleteSession(gameID);

    res.status(200).json({
      status: true,
      message: val

  })
  console.log("success " + gameID);
  }
  catch(err){
    console.error(err);
    res.status(500).json({
      error: err.message
    })
  }
});


//No worky. Will come back to when necessary
adminPublicRouter.post("/get-players", async function(req, res) {
  try{
    const {gameID} = req.body;
    const players = await getGamePlayers(gameID);
    res.status(200).json({
      status: true,
      players: players
    })
  }
  catch (err){
    console.error(err)
    res.status(500).json({
      error: err.message
    })
  }
});
/**
 * Catch all endpoint for bad requests
 */
adminPublicRouter.all("*", async function(_, res) {
  res.status(404).json({
    error: "Not Found"
  });
});

module.exports = adminPublicRouter;