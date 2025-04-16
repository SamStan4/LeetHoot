const serverIP = import.meta.env.VITE_SERVER_IP
const serverPort = import.meta.env.VITE_SERVER_PORT;

import { io } from "socket.io-client";

const socket = io(`http://${serverIP}:${serverPort}`);

export default socket;