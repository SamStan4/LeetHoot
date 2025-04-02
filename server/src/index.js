/**
 * This file holds all of the API endpoints
 * 
 * If you are working on this, look up how a REST API works first :)
 */

const express = require('express'); // library for making REST API in node.js
const dotenv = require('dotenv');   // for loading .env files (where we put secret information)
const sqlite3 = require('sqlite3'); // for interacting with an sqlite db

dotenv.config();

const serverApp = express();
const listenPort = process.env.PORT || 8080;

serverApp.use(express.json());

const db = new sqlite3.Database("data.db", (err) => {
    if (err) {
        console.error("Error connecting to database");
        process.exit(1);
    } else {
        console.log("connected to database");
    }
});

serverApp.listen(listenPort, () => {
        console.log(`Server started, listening on port ${listenPort}`);
    }
);