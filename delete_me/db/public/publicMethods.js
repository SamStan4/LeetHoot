require("dotenv").config();

const problemApiIP = process.env.PROBLEM_API_IP;
const problemApiPort = process.env.PROBLEM_API_PORT;

const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./data/database.db", (err) => {
  if (err) {
    console.error(err);
    process.exit(1);
  } else {
    console.log("public method module connected to database");
  }
});

//----------------------------------------------------------------------------------------------------------------------------------------------//

/**
 * A middle point of interaction where we forward a request to the problem api
 * @returns a list of all questions in the problem AIP sever
 */
async function fetchAllQuestions() {
  const url = `http://${problemApiIP}:${problemApiPort}/api/v1/problems`;
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  });
  if (!response.ok) {
    throw new Error();
  }
  const data = await response.json();
  return data.problems;
}

/**
 * Checks if a game exists in the database
 * @param { string } gameID 
 * @returns { bool } true if the game exists, false otherwise
 */
async function checkGameExistance(gameID) {
  const sqlString = "SELECT COUNT(*) AS count FROM GameTable WHERE GameTable.gameID = ?";
  return new Promise((resolve, reject) => {
    db.get(sqlString, [parseInt(gameID, 10)], function (err, row) {
      if (err) {
        reject(err);
      } else {
        resolve(row.count > 0);
      }
    });
  });
}

/**
 * Checks if a name is avialale in a particular game
 * @param { string } gameID 
 * @param { string } name 
 */
async function checkNameAvailability(gameID, name) {
  const sqlString = "SELECT COUNT(*) AS count FROM PlayerTable WHERE PlayerTable.gameID = ? AND PlayerTable.playerName = ?;";
  return new Promise((resolve, reject) => {
    db.get(sqlString, [gameID, name], function (err, row) {
      if (err) {
        reject(err);
      } else {
        resolve(row.count === 0);
      }
    });
  });
}

//----------------------------------------------------------------------------------------------------------------------------------------------//

module.exports = {
  fetchAllQuestions,
  checkGameExistance,
  checkNameAvailability
};