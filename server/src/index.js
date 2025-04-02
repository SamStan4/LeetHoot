/**
 * This file holds all of the API endpoints
 * 
 * If you are working on this, look up how a REST API works first :)
 */

const express = require("express"); // library for making REST API in node.js
const dotenv = require("dotenv");   // for loading .env files (where we put secret information)
const cors = require("cors");

const { getAllQuestions } = require("./db/databaseUtils");

dotenv.config();

const serverApp = express();
const listenPort = process.env.PORT || 8080;
serverApp.use(cors());

serverApp.use(express.json());

serverApp.get("/api/questions/all", async (_, res) => {
  try {
    const questions = await getAllQuestions();
    res.json(questions);
  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
});

serverApp.listen(listenPort, () => {
    console.log(`Server started, listening on port ${listenPort}`);
  }
);