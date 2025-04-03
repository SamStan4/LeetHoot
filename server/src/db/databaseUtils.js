const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./data/database.db", (err) => {
  if (err) {
    console.error(err);
    process.exit(1);
  } else {
    console.log("connected to database");
  }
});

async function getAllQuestions() {
  return new Promise((resolve, reject) => {
    const sqlString = "SELECT * FROM QuestionTable ORDER BY QuestionTable.questionName;";
    db.all((sqlString), function (err, rows) {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
}

async function registerNewGame(newDeck) {
  const newDeckJson = JSON.stringify({ "questions": newDeck });
  const sqlString = "INSERT INTO GameTable (GameQuestions) VALUES (?)";
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
  getAllQuestions,
  registerNewGame
};