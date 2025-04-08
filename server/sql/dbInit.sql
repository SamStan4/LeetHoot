CREATE TABLE IF NOT EXISTS QuestionTable (
  questionName TEXT NOT NULL,
  questionDifficulty TEXT NOT NULL,
  PRIMARY KEY (questionName)
);

CREATE TABLE IF NOT EXISTS GameTable (
  gameID INTEGER PRIMARY KEY AUTOINCREMENT,
  gameQuestions TEXT NOT NULL,
  gameState INTEGER DEFAULT -1
);

CREATE TABLE IF NOT EXISTS PlayerTable (
  gameID INTEGER NOT NULL,
  playerName TEXT NOT NULL,
  hasAnswered BOOLEAN INTEGER DEFAULT 0 CHECK (hasAnswered IN (0, 1)),
  score INTEGER NOT NULL DEFAULT 0 CHECK (score >= 0),
  PRIMARY KEY (gameID, playerName),
  FOREIGN KEY (gameID) REFERENCES GameTable(gameID) ON DELETE CASCADE
);

CREATE TRIGGER resetHasAnsweredOnGameStateChange
AFTER UPDATE OF gameState ON GameTable
FOR EACH ROW
WHEN NEW.gameState > OLD.gameState
BEGIN
  UPDATE PlayerTable
  SET hasAnswered = 0
  WHERE gameID = NEW.gameID;
END;