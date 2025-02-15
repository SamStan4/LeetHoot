CREATE TABLE IF NOT EXISTS HostTable (
    hostID SERIAL NOT NULL,
    hostUserName VARCHAR(255) NOT NULL,
    PRIMARY KEY (hostID)
);

CREATE TABLE IF NOT EXISTS PlayerTable (
    playerID SERIAL NOT NULL,
    playerUserName VARCHAR(255),
    PRIMARY KEY (playerID)
);

CREATE TABLE IF NOT EXISTS GameTable (
    gameID SERIAL NOT NULL,
    hostID INTEGER NOT NULL,
    questionIndex INTEGER NOT NULL DEFAULT 0,
    PRIMARY KEY (gameID),
    FOREIGN KEY (hostID) REFERENCES HostTable(hostID)
);

CREATE TABLE IF NOT EXISTS GameParticipantTable (
    gameID INTEGER NOT NULL,
    playerID INTEGER NOT NULL,
    playerScore FLOAT NOT NULL DEFAULT 0.0,
    PRIMARY KEY (gameID, playerID),
    FOREIGN KEY (gameID) REFERENCES GameTable(gameID),
    FOREIGN KEY (playerID) REFERENCES PlayerTable(playerID)
);

CREATE TABLE IF NOT EXISTS QuestionDeckTable (
    questionDeckID SERIAL NOT NULL,
    questionDeckName VARCHAR(255) NOT NULL UNIQUE,
    PRIMARY KEY (questionDeckID)
);

CREATE TABLE IF NOT EXISTS QuestionTable (
    questionID SERIAL NOT NULL,playerUserName
    PRIMARY KEY (questionID, questionDeckID),
    FOREIGN KEY (questionID) REFERENCES QuestionTable(questionID),
    FOREIGN KEY (questionDeckID) REFERENCES QuestionDeckTable(questionDeckID)
);

CREATE INDEX idx_playerUserName ON PlayerTable(playerUserName);

CREATE INDEX idx_questionDeckName ON QuestionDeckTable(questionDeckName);