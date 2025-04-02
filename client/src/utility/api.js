require('dotenv').config();

const codeRunnerPort = process.env.PROBLEM_API_PORT;
const serverPort = process.env.SERVER_PORT;

// TODO: implement this
export async function checkGameExistance(gameId) {
    return gameId === "1234";
}

// TODO: implement this
export async function checkNameAvailability(gameId, name) {
    return name === "sam";
}

// TODO: implement this
export async function getDecks() {
    return [];
}

// TODO: implement this
export async function createNewGame(deckName) {
    return "1234";
}