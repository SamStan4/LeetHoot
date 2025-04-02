CREATE TABLE IF NOT EXISTS QuestionTable (
  questionName TEXT NOT NULL,
  questionDifficulty TEXT NOT NULL,
  PRIMARY KEY (questionName)
);

-- There is going to be some triggers on this table that will trip some web sockets
CREATE TABLE IF NOT EXISTS GameTable (
  gameID INTEGER PRIMARY KEY AUTOINCREMENT,
  gameQuestions TEXT NOT NULL,
  gameState INTEGER DEFAULT -1
);