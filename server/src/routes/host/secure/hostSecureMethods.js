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
    console.log("host secure method module connected to database");
  }
});

//----------------------------------------------------------------------------------------------------------------------------------------------//

async function verifyHostAuthToken(jwtToken, gameID) {
  try {
    const decoded = jwt.verify(jwtToken, jwtSecret);

    if (decoded.role !== "host") {
      console.warn("Token role mismatch:", decoded.role);
      return false;
    }

    if (gameID && String(decoded.gameID) !== String(gameID)) {
      console.warn("Token gameID mismatch. Expected:", gameID, "Got:", decoded.gameID);
      return false;
    }

    return true;
  } catch (err) {
    console.error("JWT verification failed:", err.message);
    return false;
  }
}

async function getCurrentQuestion(gameID) {
  const sqlString = "SELECT gameQuestions, gameState FROM GameTable WHERE gameID = ?;"
  return new Promise((resolve, reject) => {
    db.get(sqlString, [gameID], function (err, row) {
      if (err) {
        return reject(err)
      } else if (!row) {
        return reject(new Error ("row undefined"));
      }
      try {
        const gameQuestions = JSON.parse(row.gameQuestions).questions;
        const gameState = row.gameState;
        if (gameState < 0 || gameState >= gameQuestions.length) {
          return resolve("");
        } else {
          resolve(gameQuestions[gameState]);
        }
      } catch (err) {
        reject(err);
      }
    });
  });
}

async function incrementQuestionIdx(gameID) {
  const sqlString = "UPDATE GameTable SET gameState = gameState + 1 WHERE gameID = ?;";
  return new Promise((resolve, reject) => {
    db.run(sqlString, [gameID], function (err) {
      if (err) {
        reject(err);
      } else if (this.changes === 0) {
        resolve(false);
      } else {
        resolve(true);
      }
    });
  });
}

async function fetchGameState(gameID) {
  const sqlString = "SELECT * FROM GameTable WHERE gameID = ?;"
  return new Promise((resolve, reject) => {
    db.get(sqlString, [gameID], function (err, row) {
      if (err) {
        return reject(err);
      } else if (!row) {
        return reject(new Error("game not found"));
      }
      try {
        const gameQuestions = JSON.parse(row.gameQuestions)["questions"];
        const gameState = row.gameState;
        if (gameState === -1) {
          return resolve("pre-lobby");
        } else if (gameState === gameQuestions.length) {
          return resolve("post-lobby");
        } else {
          return resolve("running");
        }
      } catch (parseErr) {
        reject(parseErr);
      }
    });
  });
}

async function getLeaderBoard(gameID) {
  const sqlString = "SELECT playerName, score FROM PlayerTable WHERE gameID = ? ORDER BY score DESC;"
  return new Promise((resolve, reject) => {
    db.all(sqlString, [gameID], function (err, rows) {
      if (err) {
        return reject(err);
      } else if (!rows) {
        return reject (new Error("rows undefined"));
      }
      resolve(rows);
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
      resolve(this.changes > 0);
    });
  });
}
//----------------------------------------------------------------------------------------------------------------------------------------------//

module.exports = {
  verifyHostAuthToken,
  getCurrentQuestion,
  incrementQuestionIdx,
  fetchGameState,
  getLeaderBoard,
  deleteGame
};