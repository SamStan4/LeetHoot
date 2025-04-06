const sqlite3 = require("sqlite3").verbose();
const jwt = require("jsonwebtoken");
require("dotenv").config();

//----------------------------------------------------------------------------------------------------------------------------------------------//

const problemApiIP = process.env.PROBLEM_API_IP;
const problemApiPort = process.env.PROBLEM_API_PORT;
const jwtSecret = process.env.JWT_SECRET;

if (!jwtSecret || !problemApiIP || !problemApiPort) {
  console.error("unable to load env vars, exiting");
  process.exit(1);
}

const db = new sqlite3.Database("./data/database.db", (err) => {
  if (err) {
    console.error(err);
    process.exit(1);
  } else {
    console.log("host public method module connected to database");
  }
});

//----------------------------------------------------------------------------------------------------------------------------------------------//

async function generateHostAuthToken(gameID, options = {}) {
  const hostAuthPayload = {
    role: "host",
    gameID: gameID
  };
  return jwt.sign(hostAuthPayload, jwtSecret, {
    expiresIn: "2h",
    ...options
  });
}

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
  return data.problems.map((problem) => {
    return {
      problemName: problem.id,
      problemDifficulty: problem.metadata.difficulty
    };
  });
}

async function registerNewGame(newDeck) {
  const newDeckJson = JSON.stringify({ "questions": newDeck });
  const sqlString = "INSERT INTO GameTable (GameQuestions) VALUES (?);";
  return new Promise((resolve, reject) => {
    db.run(sqlString, [newDeckJson], function(err) {
      if (err) {
        reject(err);
      } else {
        resolve(this.lastID);
      }
    });
  });
}

module.exports = {
  generateHostAuthToken,
  fetchAllQuestions,
  registerNewGame
};