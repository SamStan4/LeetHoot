SELECT * FROM QuestionTable ORDER BY QuestionTable.questionName;

SELECT COUNT(*) AS count FROM PlayerTable WHERE PlayerTable.gameID = ? AND PlayerTable.playerName = ?;