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
    PRIMARY KEY (gameID, playerID),
    FOREIGN KEY (gameID) REFERENCES GameTable(gameID),
    FOREIGN KEY (playerID) REFERENCES PlayerTable(playerID)
);

CREATE TABLE IF NOT EXISTS QuestionDecks (
    questionDeckID SERIAL NOT NULL,
    questionDeckName VARCHAR(255) NOT NULL UNIQUE,
    PRIMARY KEY (questionDeckID)
);

CREATE TABLE IF NOT EXISTS QuestionTable (
    questionID SERIAL NOT NULL,
    questionName VARCHAR(255) NOT NULL UNIQUE,
    questionDetails jsonb NOT NULL,
    PRIMARY KEY (questionID)
);