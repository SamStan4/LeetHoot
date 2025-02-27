/**
 * This file holds all of the API endpoints
 * 
 * If you are working on this, look up how a REST API works first :)
 */

const express = require('express'); // library for making REST API in node.js
const dotenv = require('dotenv');   // for loading .env files (where we put secret information)

dotenv.config();

const serverApp = express();
const listenPort = process.env.PORT || 8080;

serverApp.use(express.json());

serverApp.listen(
    listenPort,
    () => {
        console.log(`Server started, listening on port ${listenPort}`);
    }
)

// test api endpoints
{
    serverApp.get('/test/hello-world', (_, res) => {
        try {
            res.status(200).send({
                message: 'hello world'
            });
        } catch (e) {
            console.error(e);
            res.sendStatus(500);
        }
    });

    serverApp.get('/test/echo-back', (req, res) => {
        try {
            if (!('message' in req.body)) {
                res.sendStatus(400);
            } else {
                const { message } = req.body;
                res.status(200).send({
                    echo: message
                });
            }
        } catch (e) {
            console.error(e);
            res.sendStatus(500);
        }
    });
}