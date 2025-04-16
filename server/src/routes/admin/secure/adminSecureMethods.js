const sqlite3 = require("sqlite3").verbose();
const jwt = require("jsonwebtoken");
require("dotenv").config();

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
    console.log("admin secure method module connected to database");
  }
});

function verifyAdminAuthToken(token) {
  try {
    const decoded = jwt.verify(token, jwtSecret);
    return decoded.role === "admin";
  } catch (err) {
    return false;
  }
}

async function getAllGames() {
  const sqlString = "SELECT * FROM GameTable ORDER BY gameID ASC;";
  return new Promise((resolve, reject) => {
    db.all(sqlString, [], (err, rows) => {
      if (err) {
        return reject(err);
      }
      resolve(rows);
    });
  });
}

async function getGamePlayers(gameID) {
  const sqlString = "SELECT playerName FROM PlayerTable WHERE gameID = ? ORDER BY playerName ASC;"
  return new Promise((resolve, reject) => {
    db.all(sqlString, [gameID], function (err, rows) {
      if (err) {
        return reject(err);
      } else if (!rows) {
        return reject(new Error("rows undefined"));
      }
      return resolve(rows); 
    });
  })
}

async function deleteGame(gameID) {
  const sqlString = "DELETE FROM GameTable WHERE gameID = ?;";
  return new Promise((resolve, reject) => {
    db.run(sqlString, [gameID], function (err) {
      if (err) {
        return reject(err);
      }
      if (this.changes === 0) {
        return reject(new Error("No game deleted. GameID might not exist."));
      }
      resolve(true);
    });
  });
}

async function removePlayer(gameID, playerName) {
  const sqlString = "DELETE FROM PlayerTable WHERE gameID = ? AND playerName = ?;";
  return new Promise((resolve, reject) => {
    db.run(sqlString, [gameID, playerName], function (err) {
      if (err) {
        return reject(err);
      }
      if (this.changes === 0) {
        return reject(new Error("No player removed. Check gameID and playerName."));
      }
      resolve(true);
    });
  });
}

module.exports = {
  getAllGames,
  getGamePlayers,
  deleteGame,
  removePlayer,
  verifyAdminAuthToken
};