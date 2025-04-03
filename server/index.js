/**
 * This file holds all of the API endpoints
 * 
 * If you are working on this, look up how a REST API works first :)
 */

const express = require('express'); // library for making REST API in node.js
const dotenv = require('dotenv');   // for loading .env files (where we put secret information)

dotenv.config();

function CalculateUserScore(userResults){

    const maxRuntime = 5000;
    let passedCasesTime = 0;
    let failedCasesTime = 0;

    const numTestCases = userResults.results.length;
    let passedTests = 0;

    //Separate the total runtime into time spent on failed cases and passed cases
    for (let i = 0; i < numTestCases; ++i){
        if(userResults.results[i].pass === true){
            ++passedTests;
            passedCasesTime += userResults.results[i].time;
        }
        else{
            failedCasesTime += userResults.results[i].time;
        }
    }

    //Calculates the score of the user out of 1000
    //500 points come from time to run test cases and 500 comes from the percentage of cases that are passed
    questionScore = (((maxRuntime / (res.time + failedCasesTime)) 
                    * ((passedCasesTime / userResults.time) * 100)) % 500) + (500 * (passedTests / numTestCases));
    
}

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