const express = require('express');
const adminSecureROuter = express.Router();

const { deleteSession } = require ("./adminSecureMethods")

adminSecureROuter.post("/delete-session", async function(req, res){
  /*
  try{
    //const { gameID } = req.params;
    const gameID = 18
    deleteSession(gameID);
    res.status(200)
  }
  catch(err){
    console.error(err);
    res.status(500).json({
      error: err.message
    })
  }
    */
  res.json({ message: 'Test route is working!' });
});

/**
 * Catch all endpoint for bad requests
 */
adminSecureROuter.all("*", async function(_, res) {
  res.status(404).json({
    error: "Not Found"
  });
});

module.exports = adminSecureROuter;