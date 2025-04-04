// Well didnt know vite doesnt use "process" but "import.meta"... 1 hour of debugging later
const serverIP = import.meta.env.VITE_SERVER_IP
const problemApiIP = import.meta.env.VITE_PROBLEM_API_IP;
const serverPort = import.meta.env.VITE_SERVER_PORT;
const problemApiPort = import.meta.env.VITE_PROBLEM_API_PORT;

export async function checkGameExistance(gameId) {
  const url = `http://${serverIP}:${serverPort}/api/game/exists`;
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ gameID: gameId })
    });
    if (!response.ok) {
      throw new Error();
    }
    const data = await response.json();
    return data;
  } catch (err) {
    console.error(err);
    return false;
  }
}

// TODO: implement this
export async function checkNameAvailability(gameId, name) {
  return name === "sam";
}

export async function getAllQuestions() {
  const url = `http://${serverIP}:${serverPort}/api/questions/all`;
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });
    if (!response.ok) {
      throw new Error();
    }
    const data = await response.json();
    return data;
  } catch (err) {
    console.error(err);
    return [];
  }
}

export async function registerGame(gameQuestions) {
  const url = `http://${serverIP}:${serverPort}/api/game/register`;
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(gameQuestions)
    });
    if (!response.ok) {
      throw new Error();
    }
    const data = await response.json();
    return data;
  } catch (err) {
    console.error(err);
    return "";
  }
}