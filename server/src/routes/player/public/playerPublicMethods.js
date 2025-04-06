const sqlite3 = require("sqlite3").verbose();
const jwt = require("jsonwebtoken");
require("dotenv").config();

//----------------------------------------------------------------------------------------------------------------------------------------------//

const jwtSecret = process.env.JWT_SECRET;

if (!jwtSecret) {
  console.error("unable to load jwt secret, exiting");
  process.exit(1);
}

const db = new sqlite3.Database("./data/database.db", (err) => {
  if (err) {
    console.error(err);
    process.exit(1);
  } else {
    console.log("player public method module connected to database");
  }
});

//----------------------------------------------------------------------------------------------------------------------------------------------//

async function generatePlayerAuthToken(gameID, playerName, options = {}) {
  const playerAuthPayload = {
    role: "player",
    playerName: playerName,
    gameID: gameID
  };
  return jwt.sign(playerAuthPayload, jwtSecret, {
    expiresIn: "2h",
    ...options
  });
}

//----------------------------------------------------------------------------------------------------------------------------------------------//

module.exports = {
  generatePlayerAuthToken
};