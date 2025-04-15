const sqlite3 = require("sqlite3").verbose();
const bcrypt = require("bcrypt");
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
    console.log("admin public method module connected to database");
  }
});

function generateAdminAuthToken(adminUserName, options = {}) {
  const adminAuthPayload = {
    role: "admin",
    username: adminUserName
  };
  return jwt.sign(adminAuthPayload, jwtSecret, {
    expiresIn: "2h",
    ...options
  });
}

async function adminLogin(username, plaintextPassword) {
  const sqlString = "SELECT passwordHash FROM AdminTable WHERE username = ?";
  return new Promise((resolve, reject) => {
    db.get(sqlString, [username], async function (err, row) {
      if (err) {
        return reject(err);
      } else if (!row) {
        return resolve(false);
      }
      try {
        const match = await bcrypt.compare(plaintextPassword, row.passwordHash);
        resolve(match);
      } catch (err) {
        return reject(err);
      }
    })
  });
}

async function createAdminUser(userName, password) {
  const saltRounds = 10;
  const passwordHash =  await bcrypt.hash(password, saltRounds);
  const sqlString = `INSERT INTO AdminTable (username, passwordHash) VALUES (?, ?)`;
  return new Promise((resolve, reject) => {
    db.run(sqlString, [userName, passwordHash], function (err) {
      if (err) {
        return reject(err);
      }
      return resolve(true);
    });
  })
}

module.exports = {
  createAdminUser,
  generateAdminAuthToken,
  adminLogin
};