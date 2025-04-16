const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");

dotenv.config();

const playerRouterFactory = require("./routes/player/playerRouter");
const hostRouterFactory = require("./routes/host/hostRouter");
const adminRouter = require("./routes/admin/adminRouter");

const serverApp = express();
const listenPort = process.env.PORT || 8080;

const httpServer = http.createServer(serverApp);

const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

const playerSockets = {};

io.on("connection", (socket) => {
  socket.on("host-join-game", ({ gameID }) => {
    console.log("host joined session");
    socket.data.role = "host";
    socket.data.gameID = gameID;
    socket.join(gameID);
  });

  socket.on("player-join-game", ({ gameID, playerName }) => {
    console.log("player joined session");
    const uniqueID = `${gameID}-${playerName}`;
    playerSockets[uniqueID] = socket.id;
    socket.data.role = "player";
    socket.data.uniqueID = uniqueID;
    socket.data.gameID = gameID;
    socket.join(gameID);
  });

  socket.on("disconnect", () => {
    if (socket.data.role === "player" && socket.data.uniqueID) {
      delete playerSockets[socket.data.uniqueID];
    }
  });
});

serverApp.use(cors());
serverApp.use(express.json());

serverApp.use("/player", playerRouterFactory(io));
serverApp.use("/host", hostRouterFactory(io));
serverApp.use("/admin", adminRouter);

httpServer.listen(listenPort, () => {
    console.log(`Server started, listening on port ${listenPort}`);
});