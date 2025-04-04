const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

const playerRouter = require("./routes/player/playerRouter");
const hostRouter = require("./routes/host/hostRouter");
const adminRouter = require("./routes/admin/adminRouter");

const serverApp = express();
const listenPort = process.env.PORT || 8080;
serverApp.use(cors());

serverApp.use(express.json());

serverApp.use("/player", playerRouter);
serverApp.use("/host", hostRouter);
serverApp.use("/admin", adminRouter);

serverApp.listen(listenPort, () => {
    console.log(`Server started, listening on port ${listenPort}`);
  }
);