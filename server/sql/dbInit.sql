CREATE TABLE IF NOT EXISTS QuestionTable (
    questionName TEXT NOT NULL,
    questionFilePath TEXT UNIQUE NOT NULL,
    PRIMARY KEY (questionName)
);