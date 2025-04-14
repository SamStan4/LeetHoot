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

function CalculateUserScore(userResults){

    const maxRuntime = 5000;
    let passedCasesTime = 0;
    let failedCasesTime = 0;

    const numTestCases = userResults.results.length;
    let passedTests = 0;

    //Separate the total runtime into time spent on failed cases and passed cases
    for (let i = 0; i < numTestCases; ++i){
        if(userResults.results[i].pass === true){
            ++passedTests;
            passedCasesTime += userResults.results[i].time;
        }
        else{
            failedCasesTime += userResults.results[i].time;
        }
    }

    //Calculates the score of the user out of 1000
    //500 points come from time to run test cases and 500 comes from the percentage of cases that are passed
    questionScore = (((maxRuntime / (res.time + failedCasesTime)) 
                    * ((passedCasesTime / userResults.time) * 100)) % 500) + (500 * (passedTests / numTestCases));
    
}

// TODO: implement this
async function getCurrentQuestion(gameID) {
  return "two-sum";
}

//----------------------------------------------------------------------------------------------------------------------------------------------//

module.exports = {
  verifyPlayerAuthToken,
  CalculateUserScore,
  getCurrentQuestion
};