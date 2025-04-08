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
    if (decoded.gameID !== gameID || decoded.role !== "host") {
      throw new Error("Host token does not match")
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

//----------------------------------------------------------------------------------------------------------------------------------------------//

module.exports = {
  verifyHostAuthToken
};