const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./data/database.db", (err) => {
  if (err) {
    console.error(err);
    process.exit(1);
  } else {
    console.log("admin public method module connected to database");
  }
});

async function getGameSessions(){
  const sqlQuery = "SELECT gameID FROM GameTable;"
  return new Promise((resolve, reject) => {
    db.all(sqlQuery, function (err, row) {
      if (err) {
        reject(err);
      } else {
        resolve(row);
      }
    });
  });
}

async function getGamePlayers(gameID){
  const sqlQuery = "SELECT playerName FROM PlayerTable WHERE PlayerTable.gameID = ?;"
  return new Promise((resolve, reject) => {
    db.get(sqlQuery, [gameID], function (err, row) {
      if (err) {
        reject(err);
      } else {
        resolve(row);
      }
    });
  });
}

async function deleteSession(sessionID){
  const sqlQuery = "DELETE FROM GameTable WHERE gameID = ?"
  new Promise((resolve, reject) => {
    db.run(sqlQuery, sessionID, function(err, status){
      if(err){
        reject(err)
        return console.error(err.message);
      }else{
        resolve(status)
      }
    });
  })
}

module.exports = {
  getGameSessions,
  getGamePlayers,
  deleteSession
};