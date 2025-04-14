const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./data/database.db", (err) => {
  if (err) {
    console.error(err);
    process.exit(1);
  } else {
    console.log("admin secure method module connected to database");
  }
});

async function deleteSession(sessionID){
  const sqlQuery = "DELETE FROM GameTable WHERE gameID = ?"
  db.run(sqlQuery, sessionID, function(err){
    if(err){
      return console.error(err.message);
    }
  });
}

module.exports = {
  deleteSession
};