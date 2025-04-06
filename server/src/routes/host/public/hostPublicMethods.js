const sqlite3 = require("sqlite3").verbose();
require("dotenv").config();

const problemApiIP = process.env.PROBLEM_API_IP;
const problemApiPort = process.env.PROBLEM_API_PORT;


const db = new sqlite3.Database("./data/database.db", (err) => {
  if (err) {
    console.error(err);
    process.exit(1);
  } else {
    console.log("host public method module connected to database");
  }
});

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
  fetchAllQuestions,
  registerNewGame
};