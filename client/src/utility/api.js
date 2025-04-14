// Well didnt know vite doesnt use "process" but "import.meta"... 1 hour of debugging later
const serverIP = import.meta.env.VITE_SERVER_IP
const serverPort = import.meta.env.VITE_SERVER_PORT;

// PUBLIC

export async function checkGameExistance(gameId) {
  const url = `http://${serverIP}:${serverPort}/player/public/check-game-existance`;
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
    const { status } = data;
    return status;
  } catch (err) {
    console.error(err);
    return false;
  }
}

// TODO: implement this
export async function checkNameAvailability(gameId, name) {
  const url = `http://${serverIP}:${serverPort}/player/public/check-name-availability`;
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        gameID: gameId,
        playerName: name
      })
    });
    if (!response.ok) {
      throw new Error();
    }
    const data = await response.json();
    const { status } = data;
    return status;
  } catch (err) {
    console.error(err);
    return false;
  }
}

export async function getAllProblems() {
  const url = `http://${serverIP}:${serverPort}/host/public/get-all-problems`;
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
    return data.problems;
  } catch (err) {
    console.error(err);
    return [];
  }
}

export async function registerGame(gameProblems) {
  const url = `http://${serverIP}:${serverPort}/host/public/register-new-game`;
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        questionList: gameProblems
      })
    });
    if (!response.ok) {
      throw new Error();
    }
    const data = await response.json();
    const { gameID, hostToken } = data;
    sessionStorage.setItem("hostToken", hostToken);
    return gameID;
  } catch (err) {
    console.error(err);
    return "";
  }
}

export async function registerPlayer(gameID, playerName) {
  const url = `http://${serverIP}:${serverPort}/player/public/register-player`;
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        gameID: gameID,
        playerName: playerName
      })
    });
    if (!response.ok) {
      throw new Error();
    }
    const data = await response.json();
    const { status, playerToken } = data;
    if (!status) {
      return false;
    }
    sessionStorage.setItem("playerToken", playerToken);
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
}

export async function getProblemDetails(problemName) {
  const url = `http://${serverIP}:${serverPort}/host/public/get-problem-details`;
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        problemName: problemName
      })
    });
    if (!response.ok) {
      throw new Error();
    }
    const data = await response.json();
    const { problemDetails } = data;
    return problemDetails;
  } catch (err) {
    console.error(err);
    return null;
  }
}

// SECURE

export async function getCurrentProblemPlayer(gameID, playerName) {
  const url = `http://${serverIP}:${serverPort}/player/secure/get-current-problem`;
  const token = sessionStorage.getItem("playerToken");
  if (!token) {
    return "";
  }
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "gameID": gameID,
        "playerName": playerName
      })
    });
    if (!response.ok) {
      throw new Error();
    }
    const data = await response.json();
    const { problemName } = data;
    return problemName;
  } catch (err) {
    console.error(err);
    return "";
  }
}

export async function getCurrentProblemHost(gameID) {
  const url = `http://${serverIP}:${serverPort}/host/secure/get-current-problem`;
  const token = sessionStorage.getItem("hostToken");
  if (!token) {
    return "";
  }
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "gameID": gameID
      })
    });
    if (!response.ok) {
      throw new Error();
    }
    const data = await response.json();
    const { problemName } = data;
    if (!problemName) {
      return "";
    }
    return problemName;
  } catch (err) {
    console.error(err);
    return "";
  }
}

export async function incrementDeckIndex(gameID) {
  const url = `http://${serverIP}:${serverPort}/host/secure/increment-game-idx`;
  const token = sessionStorage.getItem("hostToken");
  if (!token) {
    return false;
  }
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "gameID": gameID
      })
    });
    if (!response.ok) {
      throw new Error();
    }
    const data = await response.json();
    const { status } = data;
    if (!status) {
      return false;
    }
    return status;
  } catch (err) {
    console.error(err);
    return false;
  }
}