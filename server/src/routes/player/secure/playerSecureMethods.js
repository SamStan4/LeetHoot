const sqlite3 = require("sqlite3").verbose();
const jwt = require("jsonwebtoken");
require("dotenv").config();

//----------------------------------------------------------------------------------------------------------------------------------------------//

const problemApiIP = process.env.PROBLEM_API_IP;
const problemApiPort = process.env.PROBLEM_API_PORT;
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
    console.log("player secure method module connected to database");
  }
});

//----------------------------------------------------------------------------------------------------------------------------------------------//

async function verifyPlayerAuthToken(jwtToken, gameID, playerName) {
  try {
    const decoded = jwt.verify(jwtToken, jwtSecret);
    if (decoded.playerName !== playerName || decoded.gameID !== gameID || decoded.role !== "player") {
      throw new Error("Player token does not match");
    }
    return {
      valid: true,
      payload: decoded
    };
  } catch (err) {
    return {
      valid: false,
      error: err.message
    };
  }
}

function CalculateUserScore(userResults) {
  const maxRuntime = 5000;
  let passedCasesTime = 0;
  let failedCasesTime = 0;

  const numTestCases = userResults.results.length;
  let passedTests = 0;

  for (let i = 0; i < numTestCases; ++i) {
    if (userResults.results[i].pass === true) {
      ++passedTests;
      passedCasesTime += userResults.results[i].time;
    } else {
      failedCasesTime += userResults.results[i].time;
    }
  }

  // Make sure we don't divide by 0
  const totalTime = userResults.time + failedCasesTime || 1;

  // 500 from performance, 500 from correctness
  const performanceScore = ((maxRuntime / totalTime) * ((passedCasesTime / userResults.time) * 100)) % 500;
  const correctnessScore = 500 * (passedTests / numTestCases);

  const questionScore = Math.round(performanceScore + correctnessScore);
  return questionScore;
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

async function runCode(playerCode, problemName) {
  const url = `http://${problemApiIP}:${problemApiPort}/api/v1/problems/${problemName}/run`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      clientCode: playerCode,
      stopOnFail: true,
      language: 'python3',
      testCaseIndexes: '0-2'
    })
  });
  if (!response.ok) {
    throw new Error("response not ok");
  }
  const data = await response.json();
  return data;
}

async function submitCode(playerCode, problemName, playerName, gameID) {
  const url = `http://${problemApiIP}:${problemApiPort}/api/v1/problems/${problemName}/run`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      clientCode: playerCode,
      stopOnFail: true,
      language: 'python3',
      testCaseIndexes: 'all'
    })
  });
  if (!response.ok) {
    throw new Error("response not ok");
  }
  const data = await response.json();
  const score = CalculateUserScore(data);
  console.log(`\n\nSCORE: ${score}\n\n`);
  const sqlString = "UPDATE PlayerTable SET score = score + ? WHERE gameID = ? AND playerName = ?;";
  return new Promise((resolve, reject) => {
    db.run(sqlString, [score, gameID, playerName], function (err) {
      if (err) {
        return reject(err);
      }
      return resolve(true);
    });
  })
}


//----------------------------------------------------------------------------------------------------------------------------------------------//

module.exports = {
  verifyPlayerAuthToken,
  CalculateUserScore,
  getCurrentQuestion,
  fetchGameState,
  runCode,
  submitCode
};