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

export async function hostLogin(userName, password) {
  if (!userName || !password) {
    return false;
  }
  const url = `http://${serverIP}:${serverPort}/admin/public/login`;
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "username": userName,
        "password": password
      })
    });
    if (!response.ok) {
      return false;
    }
    const data = await response.json();
    const { result, token } = data;
    if (!result) {
      return false;
    }
    sessionStorage.setItem("adminToken", token);
    return true;
  } catch (err) {
    console.error(err);
    return false;
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

export async function getCurGameStateHost(gameID) {
  const url = `http://${serverIP}:${serverPort}/host/secure/game-state/${gameID}`;
  const token = sessionStorage.getItem("hostToken");
  if (!token) {
    return "";
  }
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });
    if (!response.ok) {
      const errorData = await response.json();
      console.error("Failed to fetch game state:", errorData);
      return "";
    }
    const data = await response.json();
    return data.gameState;
  } catch (err) {
    console.error(err);
    return "";
  }
}

export async function getLeaderBoard(gameID) {
  const url = `http://${serverIP}:${serverPort}/host/secure/leader-board/${gameID}`;
  const token = sessionStorage.getItem("hostToken");
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });
    if (!response.ok) {
      const errorData = await response.json();
      console.error("Failed to fetch game state:", errorData);
      return [];
    }
    const data = await response.json();
    return data.leaderBoard;
  } catch (err) {
    console.error(err);
    return [];
  }
}

export async function endGameHost(gameID) {
  const url = `http://${serverIP}:${serverPort}/host/secure/end-game/${gameID}`;
  const token = sessionStorage.getItem("hostToken");
  try {
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });
    if (!response.ok) {
      const errorData = await response.json();
      console.error("Failed to fetch game state:", errorData);
      return false;
    }
    const data = await response.json();
    return data.success;
  } catch (err) {
    console.error(err);
    return false;
  }
}

export async function getCurGameStatePlayer(gameID) {
  const url = `http://${serverIP}:${serverPort}/player/secure/game-state/${gameID}`;
  const token = sessionStorage.getItem("playerToken");
  if (!token) {
    return "";
  }
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });
    if (!response.ok) {
      const errorData = await response.json();
      console.error("Failed to fetch game state:", errorData);
      return "";
    }
    const data = await response.json();
    return data.gameState;
  } catch (err) {
    console.error(err);
    return "";
  }
}

export async function getAllGames() {
  const url = `http://${serverIP}:${serverPort}/admin/secure/games/all`;
  const token = sessionStorage.getItem("adminToken");
  if (!token) {
    return [];
  }
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });
    if (!response.ok) {
      const errorData = await response.json();
      console.error("Failed to fetch game state:", errorData);
      return [];
    }
    const data = await response.json();
    return data.games;
  } catch (err) {
    console.error(err);
    return [];
  }
}

export async function getGamePlayers(gameID) {
  const url = `http://${serverIP}:${serverPort}/admin/secure/games/players/${gameID}`;
  const token = sessionStorage.getItem("adminToken");
  if (!token) {
    return [];
  }
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });
    if (!response.ok) {
      const errorData = await response.json();
      console.error("Failed to fetch game state:", errorData);
      return [];
    }
    const data = await response.json();
    return data.playerList;
  } catch (err) {
    console.error(err);
    return [];
  }
}

export async function deleteGameAdmin(gameID) {
  const url = `http://${serverIP}:${serverPort}/admin/secure/games/${gameID}`;
  const token = sessionStorage.getItem("adminToken");
  if (!token) {
    return false;
  }
  try {
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });
    if (!response.ok) {
      const errorData = await response.json();
      console.error("Failed to fetch game state:", errorData);
      return false;
    }
    const data = await response.json();
    return data.status;
  } catch (err) {
    console.error(err);
    return false;
  }
}

export async function deletePlayerAdmin(gameID, playerID) {
  const url = `http://${serverIP}:${serverPort}/admin/secure/games/player/${gameID}/${playerID}`;
  const token = sessionStorage.getItem("adminToken");
  if (!token) {
    return false;
  }
  try {
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });
    if (!response.ok) {
      const errorData = await response.json();
      console.error("Failed to fetch game state:", errorData);
      return false;
    }
    const data = await response.json();
    return data.status;
  } catch (err) {
    console.error(err);
    return false;
  }
}

export async function runClientCode(clientCode, problemName) {
  const url = `http://${serverIP}:${serverPort}/player/secure/run-problem`;
  const token = sessionStorage.getItem("playerToken");
  if (!token) {
    return {
      ran: false
    };
  }
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "playerCode": clientCode,
        "problemName": problemName
      })
    });
    if (!response.ok) {
      const errorData = await response.json();
      console.error("Failed to fetch game state:", errorData);
      return {
        ran: false
      };
    }
    const data = await response.json();
    return {
      ran: true,
      ...data
    };
  } catch (err) {
    console.error(err);
    return {
      ran: false
    };
  }
}

export async function submitClientCode(playerCode, problemName, playerName, gameID) {
  const url = `http://${serverIP}:${serverPort}/player/secure/submit-problem`;
  const token = sessionStorage.getItem("playerToken");
  if (!token) {
    return {
      ran: false
    };
  }
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "playerName": playerName,
        "playerCode": playerCode,
        "problemName": problemName,
        "gameID": gameID
      })
    });
    if (!response.ok) {
      const errorData = await response.json();
      console.error("Failed to fetch game state:", errorData);
      return false;
    }
    const data = await response.json();
    return data.status;
  } catch (err) {
    console.error(err);
    return false;
  }
}