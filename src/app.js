const express = require("express");
const socketio = require("socket.io");
require("./database");
const http = require("http");
const path = require("path");

const cors = require("cors");
const app = express();

const routes = require("./routes");
const { createConnection } = require("./controllers/socket");

app.use(express.static(path.resolve(__dirname, "..", "public")));

app.use(express.json());

app.use(cors());

app.use(routes);

const httpServer = http.createServer(app);

const io = new socketio.Server(httpServer);

createConnection(io);

module.exports = { httpServer, io };
