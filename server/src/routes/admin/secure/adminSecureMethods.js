const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./data/database.db", (err) => {
  if (err) {
    console.error(err);
    process.exit(1);
  } else {
    console.log("admin secure method module connected to database");
  }
});

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

module.exports = {
  getAllGames
};